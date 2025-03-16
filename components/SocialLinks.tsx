import React from 'react';

const SocialLinks: React.FC = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
            <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">
                <img src="/icons/github.svg" alt="GitHub" style={{ width: '30px', height: '30px' }} />
            </a>
            <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer">
                <img src="/icons/linkedin.svg" alt="LinkedIn" style={{ width: '30px', height: '30px' }} />
            </a>
            <a href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer">
                <img src="/icons/twitter.svg" alt="Twitter" style={{ width: '30px', height: '30px' }} />
            </a>
            <a href="https://yourwebsite.com" target="_blank" rel="noopener noreferrer">
                <img src="/icons/website.svg" alt="Website" style={{ width: '30px', height: '30px' }} />
            </a>
        </div>
    );
};

export default SocialLinks;