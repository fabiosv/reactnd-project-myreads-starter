import React from 'react'
import {
  FacebookShareButton,
  GooglePlusShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailShareButton,
} from 'react-share'
import {
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  GooglePlusIcon,
  LinkedinIcon,
  EmailIcon,
} from 'react-share';

function ShareBar(props) {
  const {url} = props;
  return(
    <div style={{display: 'block', marginTop: '6px'}}>
      <FacebookShareButton url={url}>
        <FacebookIcon size={32} round/>
      </FacebookShareButton>
      <WhatsappShareButton url={url} >
        <WhatsappIcon size={32} round/>
      </WhatsappShareButton>
      <GooglePlusShareButton url={url} >
        <GooglePlusIcon size={32} round/>
      </GooglePlusShareButton>
      <TwitterShareButton url={url} >
        <TwitterIcon size={32} round/>
      </TwitterShareButton>
      <LinkedinShareButton url={url} >
        <LinkedinIcon size={32} round />
      </LinkedinShareButton>
      <EmailShareButton url={url} >
        <EmailIcon size={32} round />
      </EmailShareButton>
    </div>
  )
}

export default ShareBar