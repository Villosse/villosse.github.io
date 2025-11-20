export interface ContactItem {
  key: string;
  label: string;
  href: string;
  isEmail?: boolean;
  icon?: string;
}

export const getContactItems = (contacts: Record<string, string | undefined>): ContactItem[] => {
  const contactItems: ContactItem[] = [];

  // Define known contact types with their display labels and icons (little hacky lul)
  const knownContacts: Record<string, { label: string; isEmail?: boolean; showValue?: boolean; icon?: string }> = {
    email: { label: 'Email', isEmail: true, showValue: true, icon: 'email' },
    phone: { label: 'Phone', showValue: true, icon: 'phone' },
    github: { label: 'GitHub', icon: 'github' },
    linkedin: { label: 'LinkedIn', icon: 'linkedin' },
    website: { label: 'Website', icon: 'website' },
    twitter: { label: 'Twitter', icon: 'twitter' },
    discord: { label: 'Discord', icon: 'discord' },
    telegram: { label: 'Telegram', icon: 'telegram' },
    resume: { label: 'Resume', icon: 'resume' },
  };

  // Process all contact entries
  Object.entries(contacts).forEach(([key, value]) => {
    if (value) { // Only include if value exists, otherwise don't display it lul
      const knownContact = knownContacts[key as keyof typeof knownContacts];
      
      if (knownContact) {
        let href = value;
        let displayLabel = knownContact.label;
        
        if (knownContact.isEmail) {
          href = `mailto:${value}`;
        } else if (key === 'phone') {
          href = `tel:${value}`;
        }

        // Show actual value for email and phone, otherwise cringe
        if (knownContact.showValue) {
          displayLabel = value;
        }

        contactItems.push({
          key,
          label: displayLabel,
          href,
          isEmail: knownContact.isEmail,
          icon: knownContact.icon,
        });
      } else {
        // Handle custom contact types - capitalize first letter
        const label = key.charAt(0).toUpperCase() + key.slice(1);
        contactItems.push({
          key,
          label,
          href: value,
        });
      }
    }
  });

  return contactItems;
};

export const getPrimaryEmail = (contacts: Record<string, string | undefined>): string | undefined => {
  return contacts.email;
};