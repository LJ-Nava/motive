import React, { useState, useEffect, useCallback } from 'react';
import '../styles/emr/EMRDocumentation.scss';

// Import guide images - Plotting a New Visit
import pnv2 from '../../assets/emr-guides/plotting-new-visit/2.jpeg';
import pnv3 from '../../assets/emr-guides/plotting-new-visit/3.jpeg';
import pnv4 from '../../assets/emr-guides/plotting-new-visit/4.jpeg';
import pnv5 from '../../assets/emr-guides/plotting-new-visit/5.jpeg';
import pnv6 from '../../assets/emr-guides/plotting-new-visit/6.jpeg';
import pnv7 from '../../assets/emr-guides/plotting-new-visit/7.jpeg';
import pnv8 from '../../assets/emr-guides/plotting-new-visit/8.jpeg';
import pnv9 from '../../assets/emr-guides/plotting-new-visit/9.jpeg';

// Import guide images - Patient Signature
import ps2 from '../../assets/emr-guides/patient-signature/2.jpeg';
import ps3 from '../../assets/emr-guides/patient-signature/3.jpeg';
import ps4 from '../../assets/emr-guides/patient-signature/4.jpeg';
import ps5 from '../../assets/emr-guides/patient-signature/5.jpeg';
import ps6 from '../../assets/emr-guides/patient-signature/6.jpeg';
import ps7 from '../../assets/emr-guides/patient-signature/7.jpeg';
import ps8 from '../../assets/emr-guides/patient-signature/8.jpeg';
import ps9 from '../../assets/emr-guides/patient-signature/9.jpeg';
import ps10 from '../../assets/emr-guides/patient-signature/10.jpeg';
import ps11 from '../../assets/emr-guides/patient-signature/11.jpeg';
import ps12 from '../../assets/emr-guides/patient-signature/12.jpeg';

// Import guide images - Missed Visit
import mv2 from '../../assets/emr-guides/missed-visit/2.jpeg';
import mv3 from '../../assets/emr-guides/missed-visit/3.jpeg';
import mv4 from '../../assets/emr-guides/missed-visit/4.jpeg';
import mv5 from '../../assets/emr-guides/missed-visit/5.jpeg';
import mv6 from '../../assets/emr-guides/missed-visit/6.jpeg';
import mv7 from '../../assets/emr-guides/missed-visit/7.jpeg';
import mv8 from '../../assets/emr-guides/missed-visit/8.jpeg';
import mv9 from '../../assets/emr-guides/missed-visit/9.jpeg';
import mv10 from '../../assets/emr-guides/missed-visit/10.jpeg';
import mv11 from '../../assets/emr-guides/missed-visit/11.jpeg';
import mv12 from '../../assets/emr-guides/missed-visit/12.jpeg';

// Import guide images - Paper Route Sheet
import prs2 from '../../assets/emr-guides/paper-route-sheet/2.jpeg';
import prs3 from '../../assets/emr-guides/paper-route-sheet/3.jpeg';
import prs4 from '../../assets/emr-guides/paper-route-sheet/4.jpeg';
import routeSheetPdf from '../../assets/emr-guides/paper-route-sheet/RouteSheet.pdf';

// Import guide images - Therapy Order
import to2 from '../../assets/emr-guides/therapy-order/2.jpeg';
import to3 from '../../assets/emr-guides/therapy-order/3.jpeg';
import to4 from '../../assets/emr-guides/therapy-order/4.jpeg';
import to5 from '../../assets/emr-guides/therapy-order/5.jpeg';
import to6 from '../../assets/emr-guides/therapy-order/6.jpeg';
import to7 from '../../assets/emr-guides/therapy-order/7.jpeg';
import to8 from '../../assets/emr-guides/therapy-order/8.jpeg';

// Import guide images - Frequency Therapy Orders
import fto2 from '../../assets/emr-guides/frequency-therapy-orders/2.jpeg';
import fto3 from '../../assets/emr-guides/frequency-therapy-orders/3.jpeg';
import fto4 from '../../assets/emr-guides/frequency-therapy-orders/4.jpeg';
import fto5 from '../../assets/emr-guides/frequency-therapy-orders/5.jpeg';
import fto6 from '../../assets/emr-guides/frequency-therapy-orders/6.jpeg';
import fto7 from '../../assets/emr-guides/frequency-therapy-orders/7.jpeg';
import fto8 from '../../assets/emr-guides/frequency-therapy-orders/8.jpeg';
import fto9 from '../../assets/emr-guides/frequency-therapy-orders/9.jpeg';
import fto10 from '../../assets/emr-guides/frequency-therapy-orders/10.jpeg';
import fto11 from '../../assets/emr-guides/frequency-therapy-orders/11.jpeg';
import fto12 from '../../assets/emr-guides/frequency-therapy-orders/12.jpeg';
import fto13 from '../../assets/emr-guides/frequency-therapy-orders/13.jpeg';
import fto14 from '../../assets/emr-guides/frequency-therapy-orders/14.jpeg';
import fto15 from '../../assets/emr-guides/frequency-therapy-orders/15.jpeg';

// Import guide images - Non Visit Discharge
import nvdc2 from '../../assets/emr-guides/adding-nvdc/2.jpeg';
import nvdc3 from '../../assets/emr-guides/adding-nvdc/3.jpeg';
import nvdc4 from '../../assets/emr-guides/adding-nvdc/4.jpeg';
import nvdc5 from '../../assets/emr-guides/adding-nvdc/5.jpeg';
import nvdc6 from '../../assets/emr-guides/adding-nvdc/6.jpeg';
import nvdc7 from '../../assets/emr-guides/adding-nvdc/7.jpeg';
import nvdc8 from '../../assets/emr-guides/adding-nvdc/8.jpeg';
import nvdc9 from '../../assets/emr-guides/adding-nvdc/9.jpeg';
import nvdc10 from '../../assets/emr-guides/adding-nvdc/10.jpeg';
import nvdc11 from '../../assets/emr-guides/adding-nvdc/11.jpeg';

// Guide images mapping
const guideImages = {
  'plotting-new-visit': {
    2: pnv2, 3: pnv3, 4: pnv4, 5: pnv5, 6: pnv6, 7: pnv7, 8: pnv8, 9: pnv9
  },
  'patient-signature': {
    2: ps2, 3: ps3, 4: ps4, 5: ps5, 6: ps6, 7: ps7, 8: ps8, 9: ps9, 10: ps10, 11: ps11, 12: ps12
  },
  'missed-visit': {
    2: mv2, 3: mv3, 4: mv4, 5: mv5, 6: mv6, 7: mv7, 8: mv8, 9: mv9, 10: mv10, 11: mv11, 12: mv12
  },
  'paper-route-sheet': {
    2: prs2, 3: prs3, 4: prs4
  },
  'therapy-order': {
    2: to2, 3: to3, 4: to4, 5: to5, 6: to6, 7: to7, 8: to8
  },
  'frequency-therapy-orders': {
    2: fto2, 3: fto3, 4: fto4, 5: fto5, 6: fto6, 7: fto7, 8: fto8, 9: fto9, 10: fto10, 11: fto11, 12: fto12, 13: fto13, 14: fto14, 15: fto15
  },
  'non-visit-discharge': {
    2: nvdc2, 3: nvdc3, 4: nvdc4, 5: nvdc5, 6: nvdc6, 7: nvdc7, 8: nvdc8, 9: nvdc9, 10: nvdc10, 11: nvdc11
  }
};

// Step instructions for each guide
const guideSteps = {
  'plotting-new-visit': [
    { step: 1, text: 'Navigate to {link} and login with your username and password.', hasLink: true },
    { step: 2, text: 'Go to your patients tab and select your patient.' },
    { step: 3, text: 'Scroll down and click "Add/Remove Visits".' },
    { step: 4, text: 'Select your visit date and click on it in the calendar.' },
    { step: 5, text: 'Click "Add New Visits".' },
    { step: 6, text: 'Select your type of visit in the first menu.' },
    { step: 7, text: 'Click "Confirm".' },
    { step: 8, text: 'Click "To Patient Record".' },
    { step: 9, text: 'Your visit is now added.' }
  ],
  'patient-signature': [
    { step: 1, text: 'Navigate to {link} and login with your username and password.', hasLink: true },
    { step: 2, text: 'Go to your patients tab and select your patient.' },
    { step: 3, text: 'Select the visit.', note: 'Visit has to be created already.' },
    { step: 4, text: 'Under the PT Evaluation Menu, click edit.' },
    { step: 5, text: 'Select the "Patient Signature" option.' },
    { step: 6, text: 'Patient Signature.' },
    { step: 7, text: 'Click "Next".' },
    { step: 8, text: 'Your Signature.' },
    { step: 9, text: 'Click "Next".' },
    { step: 10, text: 'Add the date.' },
    { step: 11, text: 'Click "Next".' },
    { step: 12, text: 'Click "Save & Exit".' }
  ],
  'missed-visit': [
    { step: 1, text: 'Navigate to {link} and login with your username and password.', hasLink: true },
    { step: 2, text: 'Go to your patients tab and select your patient.' },
    { step: 3, text: 'Select the visit.' },
    { step: 4, text: 'Select the "Missed Visit" option and proceed.', note: 'Make sure to select the correct missed visit option, ignore the "missed visit (on paper)" option, the correct one in this case is only "Missed Visit".' },
    { step: 5, text: 'Click "Yes".' },
    { step: 6, text: 'Select the reason for the missed visit, Patient/Caregiver is a common example.' },
    { step: 7, text: 'Click the "Action taken:" field and type the reason for the missed visit.' },
    { step: 8, text: 'Click "Next".' },
    { step: 9, text: 'Sign.' },
    { step: 10, text: 'Click "Next".' },
    { step: 11, text: 'Click "Finalize".' },
    { step: 12, text: 'Please make sure visit is finalized and reads "Missed (Completed)".' }
  ],
  'paper-route-sheet': [
    { step: 1, text: 'Patient signatures are preferred on Therapy Sync, otherwise a paper route sheet is also acceptable.', isIntro: true },
    { step: 2, text: 'Go to your patients tab and select your patient.' },
    { step: 3, text: 'Select the visit.' },
    { step: 4, text: 'Click the "choose file" button.' },
    { step: 5, text: 'Select your file and upload it.', hasDownload: true, downloadNote: "Here's a route sheet, if ever having issues with connection and cannot collect a signature on your device on Therapy Sync. I always kept copies of these with me to collect paper signatures, I would highly recommend printing a few to have around (they are generic so you can use with any other agency as well)." }
  ],
  'therapy-order': [
    { step: 1, text: 'Navigate to {link} and login with your username and password.', hasLink: true },
    { step: 2, text: 'Go to your patients tab and select your patient.' },
    { step: 3, text: 'Scroll down and click on "Other Forms".' },
    { step: 4, text: 'Select the "PT Therapy Order" option and confirm.' },
    { step: 5, text: 'In the Additional Information box add the respective information to your order (frequency, DC order, DME order, or any recommendation) and click "Next".' },
    { step: 6, text: 'Add your Signature and click "next".' },
    { step: 7, text: 'Add the date and click "Next".' },
    { step: 8, text: 'Click "Finalize".', finalNote: 'Therapy orders are used to request frequencies after initial evaluations, after reassessments, after discharge visits, to order medical equipment (DME) or to request additional services such as OT/ST/social worker, home aide, etc.' }
  ],
  'frequency-therapy-orders': [
    { step: 1, text: 'Navigate to {link} and login with your username and password.', hasLink: true },
    { step: 2, text: 'Go to your patients tab and select your patient.' },
    { step: 3, text: 'Click "Other Forms".' },
    { step: 4, text: 'Select the "PT Therapy Order" option and confirm.' },
    { step: 5, text: 'Select the "Add/Continue Frequency" option.' },
    { step: 6, text: 'Click the "Frequency" field and type the frequency according to each patient.' },
    { step: 7, text: 'Click the "starting week of" field.' },
    { step: 8, text: 'Use the day you did the evaluation on, or the day you want this frequency to be effective on.' },
    { step: 9, text: 'Click the "Additional Information" field.' },
    { step: 10, text: 'Add a summary of your assessment, keep it brief, mention functional status, gait ability, level of assistance required and add your goals. Click Next.' },
    { step: 11, text: 'Sign.' },
    { step: 12, text: 'Click "Next".' },
    { step: 13, text: 'Add the date.' },
    { step: 14, text: 'Click "Next".' },
    { step: 15, text: 'Click "Finalize".' }
  ],
  'non-visit-discharge': [
    { step: 1, text: 'Navigate to {link} and login with your username and password.', hasLink: true },
    { step: 2, text: 'Go to your patients tab and select your patient.' },
    { step: 3, text: 'Scroll down to the visits and select the discharge visit.' },
    { step: 4, text: 'Select the "DC Summary (Without Visit)" option and click "proceed".' },
    { step: 5, text: 'Please select any reason that applies for homebound status.' },
    { step: 6, text: 'Select the options that apply for "Reasons For Discharge".' },
    { step: 7, text: 'Add any additional information and click "next".' },
    { step: 8, text: 'Update the progress percentage % and click "next".' },
    { step: 9, text: 'Add your signature and click "Next".' },
    { step: 10, text: 'Add the date and click "next".' },
    { step: 11, text: 'Click "Finalize".' }
  ]
};

// Guide sections
const guideSections = [
  {
    id: 'general',
    title: 'TherapySync General',
    description: 'General documentation guides for all TherapySync users',
    guides: [
      {
        id: 'plotting-new-visit',
        title: 'Plotting a New Visit',
        description: 'Learn how to schedule and plot new patient visits in TherapySync',
        icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
        steps: 9,
      },
      {
        id: 'patient-signature',
        title: 'Adding a Patient Signature',
        description: 'Step-by-step guide to capture and add patient signatures',
        icon: 'M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z',
        steps: 12,
      },
      {
        id: 'missed-visit',
        title: 'Document a Missed Visit',
        description: 'How to properly document and handle missed patient visits',
        icon: 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z',
        steps: 12,
      },
      {
        id: 'paper-route-sheet',
        title: 'Uploading Paper Route Sheet',
        description: 'Instructions for uploading and processing paper route sheets',
        icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
        steps: 5,
      },
    ]
  },
  {
    id: 'therapy',
    title: 'PT / OT / ST Documentation',
    description: 'Specific guides for Physical, Occupational, and Speech Therapists',
    guides: [
      {
        id: 'therapy-order',
        title: 'Creating a Therapy Order',
        description: 'Complete guide to creating therapy orders in the system',
        icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4',
        steps: 8,
      },
      {
        id: 'frequency-therapy-orders',
        title: 'Adding Frequency for Therapy Orders',
        description: 'How to set up and modify therapy order frequencies',
        icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15',
        steps: 15,
      },
      {
        id: 'non-visit-discharge',
        title: 'Non Visit Discharge',
        description: 'How to complete a discharge summary without a visit',
        icon: 'M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z',
        steps: 11,
      },
    ]
  }
];

// Authentication Component
const AuthGate = ({ onAuthenticate }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    setTimeout(() => {
      const correctPassword = process.env.REACT_APP_EMR_ACCESS_KEY || 'motivemr2026';
      if (password === correctPassword) {
        sessionStorage.setItem('emr_authenticated', 'true');
        onAuthenticate();
      } else {
        setError('Incorrect access key. Please try again.');
        setPassword('');
      }
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="emr-auth">
      <div className="emr-auth__container">
        <div className="emr-auth__icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <h2 className="emr-auth__title">EMR Documentation Access</h2>
        <p className="emr-auth__description">
          Enter your access key to view the TherapySync documentation guides.
        </p>
        <form onSubmit={handleSubmit} className="emr-auth__form">
          <div className="emr-auth__input-group">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter access key"
              className={`emr-auth__input ${error ? 'emr-auth__input--error' : ''}`}
              autoFocus
            />
            {error && <span className="emr-auth__error">{error}</span>}
          </div>
          <button
            type="submit"
            className="emr-auth__button"
            disabled={isLoading || !password}
          >
            {isLoading ? (
              <span className="emr-auth__loading">
                <span></span>
                <span></span>
                <span></span>
              </span>
            ) : (
              <>
                <span>Access Documentation</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

// Step Instruction Component
const StepInstruction = ({ stepData, stepNumber, isCentered }) => {
  const renderText = (text, hasLink) => {
    if (hasLink) {
      return (
        <>
          Navigate to{' '}
          <a
            href="https://mhc-therapysync.com"
            target="_blank"
            rel="noopener noreferrer"
            className="emr-viewer__link"
          >
            https://mhc-therapysync.com
          </a>
          {' '}and login with your username and password.
        </>
      );
    }
    return text;
  };

  return (
    <div className={`emr-viewer__instruction ${isCentered ? 'emr-viewer__instruction--centered' : ''}`}>
      <div className="emr-viewer__instruction-number">{stepNumber}</div>
      <div className="emr-viewer__instruction-content">
        <p className="emr-viewer__instruction-text">
          {renderText(stepData.text, stepData.hasLink)}
        </p>
        {stepData.note && (
          <div className="emr-viewer__instruction-note">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{stepData.note}</span>
          </div>
        )}
        {stepData.finalNote && (
          <div className="emr-viewer__instruction-final-note">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{stepData.finalNote}</span>
          </div>
        )}
        {stepData.hasDownload && (
          <div className="emr-viewer__instruction-download">
            <p className="emr-viewer__instruction-download-note">{stepData.downloadNote}</p>
            <a
              href={routeSheetPdf}
              download="RouteSheet.pdf"
              className="emr-viewer__download-button"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download Route Sheet (PDF)
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

// Guide Viewer Component
const GuideViewer = ({ guide, onBack }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [imageLoaded, setImageLoaded] = useState(false);
  const totalSteps = guide.steps;

  const getStepImage = useCallback(() => {
    if (currentStep === 1) {
      return null;
    }
    const images = guideImages[guide.id] || {};
    return images[currentStep];
  }, [currentStep, guide.id]);

  const getCurrentStepData = useCallback(() => {
    const steps = guideSteps[guide.id] || [];
    return steps.find(s => s.step === currentStep) || { step: currentStep, text: '' };
  }, [currentStep, guide.id]);

  const handlePrevious = useCallback(() => {
    if (currentStep > 1) {
      setImageLoaded(false);
      setCurrentStep(prev => prev - 1);
    }
  }, [currentStep]);

  const handleNext = useCallback(() => {
    if (currentStep < totalSteps) {
      setImageLoaded(false);
      setCurrentStep(prev => prev + 1);
    }
  }, [currentStep, totalSteps]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') handlePrevious();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'Escape') onBack();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePrevious, handleNext, onBack]);

  const stepImage = getStepImage();
  const stepData = getCurrentStepData();

  return (
    <div className="emr-viewer">
      <div className="emr-viewer__header">
        <button onClick={onBack} className="emr-viewer__back">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>Back to Guides</span>
        </button>
        <div className="emr-viewer__title-container">
          <h2 className="emr-viewer__title">{guide.title}</h2>
          <div className="emr-viewer__progress">
            <span className="emr-viewer__step-indicator">
              Step {currentStep} of {totalSteps}
            </span>
            <div className="emr-viewer__progress-bar">
              <div
                className="emr-viewer__progress-fill"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="emr-viewer__content">
        {!stepImage ? (
          /* No image - Centered layout */
          <div className="emr-viewer__step-centered">
            <StepInstruction stepData={stepData} stepNumber={currentStep} isCentered />
            {currentStep === 1 && (
              <p className="emr-viewer__step-hint">Click "Next" to start the visual guide</p>
            )}
          </div>
        ) : (
          /* With image - Two column layout */
          <div className="emr-viewer__step-container">
            <StepInstruction stepData={stepData} stepNumber={currentStep} />
            <div className="emr-viewer__image-container">
              {!imageLoaded && (
                <div className="emr-viewer__image-loading">
                  <div className="emr-viewer__spinner"></div>
                  <span>Loading image...</span>
                </div>
              )}
              <img
                src={stepImage}
                alt={`${guide.title} - Step ${currentStep}`}
                className={`emr-viewer__image ${imageLoaded ? 'emr-viewer__image--loaded' : ''}`}
                onLoad={() => setImageLoaded(true)}
              />
            </div>
          </div>
        )}
      </div>

      <div className="emr-viewer__navigation">
        <button
          onClick={handlePrevious}
          disabled={currentStep === 1}
          className="emr-viewer__nav-button emr-viewer__nav-button--prev"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          <span>Previous</span>
        </button>

        <div className="emr-viewer__step-dots">
          {Array.from({ length: totalSteps }, (_, i) => (
            <button
              key={i}
              className={`emr-viewer__dot ${currentStep === i + 1 ? 'emr-viewer__dot--active' : ''}`}
              onClick={() => {
                setImageLoaded(false);
                setCurrentStep(i + 1);
              }}
              aria-label={`Go to step ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          disabled={currentStep === totalSteps}
          className="emr-viewer__nav-button emr-viewer__nav-button--next"
        >
          <span>Next</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className="emr-viewer__keyboard-hint">
        <span>Use arrow keys to navigate</span>
        <span>Press ESC to go back</span>
      </div>
    </div>
  );
};

// Main EMR Documentation Component
const EMRDocumentation = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedGuide, setSelectedGuide] = useState(null);

  useEffect(() => {
    const authStatus = sessionStorage.getItem('emr_authenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleAuthenticate = () => {
    setIsAuthenticated(true);
  };

  const handleSelectGuide = (guide) => {
    setSelectedGuide(guide);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToList = useCallback(() => {
    setSelectedGuide(null);
  }, []);

  if (!isAuthenticated) {
    return <AuthGate onAuthenticate={handleAuthenticate} />;
  }

  if (selectedGuide) {
    return <GuideViewer guide={selectedGuide} onBack={handleBackToList} />;
  }

  return (
    <div className="emr-docs">
      <div className="emr-docs__hero">
        <div className="emr-docs__hero-content">
          <div className="emr-docs__hero-badge">TherapySync Guides</div>
          <h1 className="emr-docs__hero-title">EMR Documentation</h1>
          <p className="emr-docs__hero-subtitle">
            Step-by-step visual guides to help you navigate TherapySync effectively
          </p>
        </div>
        <div className="emr-docs__hero-decoration">
          <div className="emr-docs__hero-circle emr-docs__hero-circle--1"></div>
          <div className="emr-docs__hero-circle emr-docs__hero-circle--2"></div>
          <div className="emr-docs__hero-circle emr-docs__hero-circle--3"></div>
        </div>
      </div>

      <div className="emr-docs__container">
        {guideSections.map((section) => (
          <div key={section.id} className="emr-docs__section">
            <div className="emr-docs__section-header">
              <h2 className="emr-docs__section-title">{section.title}</h2>
              <p className="emr-docs__section-description">{section.description}</p>
            </div>
            <div className="emr-docs__grid">
              {section.guides.map((guide, index) => (
                <button
                  key={guide.id}
                  className="emr-docs__card"
                  onClick={() => handleSelectGuide(guide)}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="emr-docs__card-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d={guide.icon} />
                    </svg>
                  </div>
                  <div className="emr-docs__card-content">
                    <h3 className="emr-docs__card-title">{guide.title}</h3>
                    <p className="emr-docs__card-description">{guide.description}</p>
                    <div className="emr-docs__card-meta">
                      <span className="emr-docs__card-steps">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h7" />
                        </svg>
                        {guide.steps} steps
                      </span>
                      <span className="emr-docs__card-action">
                        View Guide
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EMRDocumentation;
