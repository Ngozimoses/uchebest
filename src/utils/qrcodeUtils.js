// src/utils/qrcodeUtils.js
// Optional: For generating QR codes (e.g., for sharing budget)
// Not used in current MVP but included for completeness

import QRCode from 'qrcode';

/**
 * Generate a data URL for a QR code
 * @param {string} text - Text to encode
 * @returns {Promise<string>} Data URL
 */
export const generateQRCodeDataURL = async (text) => {
  try {
    return await QRCode.toDataURL(text, {
      width: 300,
      margin: 2,
      color: {
        dark: '#8B5CF6', // Purple
        light: '#FFFFFF',
      },
    });
  } catch (err) {
    console.error('QR Generation failed:', err);
    return null;
  }
};

/**
 * Download QR code as PNG
 * @param {string} text - Text to encode
 * @param {string} filename - e.g., 'budget-qr.png'
 */
export const downloadQRCode = async (text, filename = 'qrcode.png') => {
  const url = await generateQRCodeDataURL(text);
  if (!url) return;

  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};