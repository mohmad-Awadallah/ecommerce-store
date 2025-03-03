import { FacebookShareButton, TwitterShareButton, FacebookIcon, TwitterIcon, WhatsappShareButton, LinkedinShareButton, WhatsappIcon, LinkedinIcon } from 'react-share';
import './ShareButtons.css'; // إذا كنت ترغب في إضافة تنسيق مخصص

// تعريف المكون ShareButtons
const ShareButtons = ({ productUrl, productName }) => {
  const shareText = `Check out this awesome product: ${productName}`;

  return (
    <div className="share-buttons-container">
      {/* تأكد من عدم تمرير networkName أو خصائص غير معترف بها مباشرة إلى العناصر DOM */}
      <FacebookShareButton url={productUrl} quote={shareText}>
        <FacebookIcon size={32} round />
      </FacebookShareButton>
      
      <TwitterShareButton url={productUrl} title={shareText}>
        <TwitterIcon size={32} round />
      </TwitterShareButton>
      
      <WhatsappShareButton url={productUrl} title={shareText}>
        <WhatsappIcon size={32} round />
      </WhatsappShareButton>
      
      <LinkedinShareButton url={productUrl}>
        <LinkedinIcon size={32} round />
      </LinkedinShareButton>
    </div>
  );
};

export default ShareButtons;
