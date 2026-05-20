import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useToast } from '../../../src/components/Toast';
import BookAppointmentImport from '../../imports/BookAppointment/BookAppointment';

export default function BookAppointment() {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleNavClick = (e) => {
    const text = e.target.textContent?.trim().toLowerCase() || '';
    const buttonName = e.target.closest('[data-name*="Button"], [data-name*="Link"]')?.textContent?.toLowerCase() || '';
    
    // Intercept "Confirm Booking" or "Next"
    if (text.includes('confirm booking') || buttonName.includes('confirm booking') || text.includes('next:') || text.includes('view urgent care map') || buttonName.includes('next')) {
      e.preventDefault();
      e.stopPropagation();
      showToast('Booking Confirmed! Your appointment has been successfully scheduled.', 'success');
      setTimeout(() => {
        navigate('/patient/appointments');
      }, 2000);
      return;
    }

    // Intercept Previous Step
    if (text.includes('previous step') || buttonName.includes('previous step')) {
      e.preventDefault();
      e.stopPropagation();
      showToast('Going back to dashboard...', 'info');
      setTimeout(() => navigate('/patient'), 1000);
      return;
    }

    const link = e.target.closest('[data-name*="Link"], [data-name*="Button"]');
    if (!link) return;
    const linkText = link.textContent?.trim().toLowerCase();
    if (linkText?.includes('dashboard'))       { e.preventDefault(); navigate('/patient'); }
    else if (linkText?.includes('my profile')) { e.preventDefault(); navigate('/patient/profile'); }
    else if (linkText?.includes('document'))   { e.preventDefault(); navigate('/patient/documents'); }
    else if (linkText?.includes('vaccination')){ e.preventDefault(); navigate('/patient/vaccinations'); }
    else if (linkText?.includes('medical file')){ e.preventDefault(); navigate('/patient/medical-file'); }
    else if (linkText?.includes('announcement')){ e.preventDefault(); navigate('/patient/announcements'); }
    else if (linkText?.includes('setting'))    { e.preventDefault(); navigate('/patient/settings'); }
  };

  return (
    <div className="w-full min-h-screen relative" onClick={handleNavClick}>
      <BookAppointmentImport />
    </div>
  );
}
