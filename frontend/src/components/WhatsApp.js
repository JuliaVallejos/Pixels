import React from 'react'

import WhatsAppWidget from 'react-whatsapp-widget'
import 'react-whatsapp-widget/dist/index.css'

const WhatsApp = () => {
  return <WhatsAppWidget phoneNumber='5491133520739' message='Hello! Welcome to Pixels!' 
  companyName='Pixels'  />
}

export default WhatsApp