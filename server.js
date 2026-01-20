const express = require('express');
const cors = require('cors');
const multer = require('multer');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = 3001;

// Configure multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 30 * 1024 * 1024, // 30MB limit
  },
});

// Middleware
app.use(cors());
app.use(express.json());

// Crear transporter de Gmail
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // hr@motivehomecare.com
      pass: process.env.EMAIL_PASS  // ufjt ynvh dcjh cmio
    }
  });
};

// Endpoint para enviar email
app.post('/api/send-email', upload.fields([{ name: 'attachments', maxCount: 10 }]), async (req, res) => {
  try {
    const formData = req.body;

    console.log('Recibiendo datos del formulario:', formData);

    // Get therapy type details
    const therapyTypesMap = {
      'physical-therapy': { name: 'Physical Therapy', abbr: 'PT', color: '#e74c3c' },
      'occupational-therapy': { name: 'Occupational Therapy', abbr: 'OT', color: '#e74c3c' },
      'speech-therapy': { name: 'Speech-Language Pathology', abbr: 'SLP', color: '#e74c3c' }
    };

    // Parse therapyTypes - it could be a string (old format) or array (new format)
    let selectedTherapyTypes = [];
    if (formData.therapyTypes) {
      // New format - array of therapy types
      if (typeof formData.therapyTypes === 'string') {
        // Check if it's a comma-separated string
        if (formData.therapyTypes.includes(',')) {
          selectedTherapyTypes = formData.therapyTypes.split(',').map(type => type.trim());
        } else {
          try {
            selectedTherapyTypes = JSON.parse(formData.therapyTypes);
          } catch (e) {
            selectedTherapyTypes = [formData.therapyTypes];
          }
        }
      } else if (Array.isArray(formData.therapyTypes)) {
        selectedTherapyTypes = formData.therapyTypes;
      }
    } else if (formData.therapyType) {
      // Old format - single therapy type
      selectedTherapyTypes = [formData.therapyType];
    }

    // Default to PT if no therapy types selected
    if (selectedTherapyTypes.length === 0) {
      selectedTherapyTypes = ['physical-therapy'];
    }

    // Create therapy object for email template
    const selectedTherapies = selectedTherapyTypes.map(type => therapyTypesMap[type] || therapyTypesMap['physical-therapy']);
    const therapyNames = selectedTherapies.map(t => t.name).join(', ');
    const therapyAbbrs = selectedTherapies.map(t => t.abbr).join('/');

    const therapy = {
      name: selectedTherapyTypes.length > 1 ? `Multiple Therapy Types (${therapyNames})` : selectedTherapies[0].name,
      abbr: therapyAbbrs,
      color: selectedTherapies[0].color
    };
    const currentDate = new Date().toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });

    // Get sender name
    const senderName = formData.submissionType === 'agency'
      ? (formData.agencyName || formData.contactName)
      : formData.contactName;

    // Preparar adjuntos
    const attachments = req.files && req.files.attachments ? req.files.attachments.map(file => ({
      filename: file.originalname,
      content: file.buffer,
      contentType: file.mimetype
    })) : [];

    console.log('Archivos recibidos:', req.files && req.files.attachments ? req.files.attachments.length : 0);

    // Configurar el email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `${formData.submissionType === 'agency' ? 'Agency Referral' : 'Patient Inquiry'} - ${therapy.name}`,
      attachments: attachments,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Referral Request</title>
        </head>
        <body style="margin: 0; padding: 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; background-color: #ffffff; line-height: 1.5; color: #333333; text-align: left;">

          <div style="width: 100%; margin: 0; padding: 0; background-color: #ffffff; text-align: left;">

            <!-- Simple Header -->
            <div style="border-bottom: 1px solid #e5e5e5; padding-bottom: 20px; margin-bottom: 30px; text-align: left;">
              <h1 style="color: #333333; margin: 0; font-size: 18px; font-weight: 600; text-align: left;">
                ${therapy.name} Referral Request
              </h1>
            </div>

            <!-- Content -->
            <div style="text-align: left;">
              <!-- Greeting -->
              <p style="margin: 0 0 20px 0; font-size: 14px; color: #333333;">Hello,</p>

              <!-- Main Request -->
              <p style="margin: 0 0 20px 0; font-size: 14px; color: #333333; line-height: 1.6;">
                Can you provide ${therapy.name} services as soon as possible.
              </p>

              ${formData.patientAddress ?
                `<p style="margin: 0 0 20px 0; font-size: 14px; color: #333333;">${formData.patientAddress}</p>` :
                ''
              }

              ${formData.approvedVisits ?
                `<p style="margin: 0 0 20px 0; font-size: 14px; color: #333333;"><strong>Approved visits:</strong> ${formData.approvedVisits}</p>` :
                ''
              }

              <!-- Patient Information -->
              <div style="margin: 20px 0;">
                <p style="margin: 0 0 10px 0; font-size: 14px; color: #333333; font-weight: 600;">Patient Information:</p>
                <div style="padding: 15px; background-color: #f8f9fa; border-left: 3px solid #dee2e6; margin: 0 0 20px 0;">
                  <pre style="white-space: pre-wrap; font-family: inherit; font-size: 14px; line-height: 1.5; color: #333333; margin: 0;">${formData.patientInfo || 'No patient information provided'}</pre>
                </div>
              </div>

              ${formData.additionalComments ? `
              <!-- Additional Comments -->
              <div style="margin: 20px 0;">
                <p style="margin: 0 0 10px 0; font-size: 14px; color: #333333; font-weight: 600;">Additional Comments:</p>
                <div style="padding: 15px; background-color: #f8f9fa; border-left: 3px solid #dee2e6;">
                  <pre style="white-space: pre-wrap; font-family: inherit; font-size: 14px; line-height: 1.5; color: #333333; margin: 0;">${formData.additionalComments}</pre>
                </div>
              </div>
              ` : ''}

              ${attachments.length > 0 ? `
              <!-- Attachments -->
              <div style="margin: 20px 0;">
                <p style="margin: 0 0 10px 0; font-size: 14px; color: #333333; font-weight: 600;">Attached Documents (${attachments.length}):</p>
                <div style="padding: 15px; background-color: #f8f9fa; border-left: 3px solid #dee2e6;">
                  ${attachments.map(att => `<p style="margin: 0 0 5px 0; font-size: 14px; color: #333333;">• ${att.filename}</p>`).join('')}
                </div>
              </div>
              ` : ''}

              <!-- Closing -->
              <p style="margin: 30px 0 20px 0; font-size: 14px; color: #333333;">Thank you</p>

            </div>

            <!-- Simple Footer -->
            <div style="border-top: 1px solid #e5e5e5; padding-top: 20px; margin-top: 40px;">
              <p style="margin: 0 0 5px 0; font-size: 14px; color: #666666;"><strong>${senderName}</strong></p>
              <p style="margin: 0 0 5px 0; font-size: 14px; color: #666666;">${formData.submissionType === 'agency' ? formData.agencyName : ''}</p>
              <p style="margin: 0 0 5px 0; font-size: 14px; color: #666666;">${formData.contactEmail}</p>
              <p style="margin: 0 0 5px 0; font-size: 14px; color: #666666;">${formData.contactPhone}</p>
              <p style="margin: 20px 0 0 0; font-size: 12px; color: #999999;">
                Sent via Motive Home Care Referral Portal on ${new Date().toLocaleString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: 'numeric',
                  minute: '2-digit'
                })}
              </p>
            </div>

          </div>
        </body>
        </html>
      `
    };

    // Crear transporter y enviar email
    const transporter = createTransporter();
    const info = await transporter.sendMail(mailOptions);

    console.log('Email enviado exitosamente:', info.messageId);

    res.json({
      success: true,
      message: 'Email enviado exitosamente',
      messageId: info.messageId
    });

  } catch (error) {
    console.error('Error enviando email:', error);
    res.status(500).json({
      success: false,
      error: 'Error enviando email',
      details: error.message
    });
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📧 Configurado para enviar desde: ${process.env.EMAIL_USER}`);
});