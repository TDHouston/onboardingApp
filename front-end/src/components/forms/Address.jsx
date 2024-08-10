import React from 'react'

const Address = () => {
  return (
    <div>
    <label htmlFor="address">Address:</label>
    <input type="text" id="address" name="address" placeholder="Street Address" />
    <input type="text" id="city" name="city" placeholder="City" />
    <input type="text" id="state" name="state" placeholder="State" />
    <input type="text" id="zip" name="zip" placeholder="ZIP Code" />
  </div>
  )
}

export default Address
