import React from "react";

import { Form, InputGroup, ImageUpload } from "./formStyles.js";

const AdForm = props => {
  return (
    <>
      <Form onSubmit={props.createAd}>
        <div className="form-container" data-btn='ad-form-inputs'>
          <InputGroup>
            <label htmlFor="offer_id" />
            <select
              type="text"
              placeholder="Offer"
              name="offer_id"
              data-btn='select-offer'
              value={props.productData.offer_id}
              onChange={props.handleChange}
              required
            >
              <option value="" disabled>
                Select an offer
              </option>
              {props.offers.map(offer => {
                return (
                  <option key={offer.id} value={offer.id}>
                    {offer.name}
                  </option>
                );
              })}
            </select>
          </InputGroup>
          {!props.productData.size.includes('plain') &&
          <>
            <InputGroup select={props.selected.includes("headline")}>
              <label htmlFor="headline" />
              <input
                type="text"
                placeholder="Headline"
                name="headline_text"
                value={props.productData.headline_text}
                onChange={props.handleChange}
              />
              <div>
                <h3>editing</h3>
                <button
                  name="currentElement"
                  value="headline"
                  data-btn='selected-element'
                  onClick={props.handleElementChange}
                />
              </div>
            </InputGroup>
            <InputGroup select={props.selected.includes("tagline")}>
              <label htmlFor="tagline" />
              <input
                type="text"
                placeholder="Tagline"
                name="tagline_text"
                value={props.productData.tagline_text}
                onChange={props.handleChange}
              />
              <div>
                <h3>editing</h3>
                <button
                  name="currentElement"
                  value="tagline"
                  onClick={props.handleElementChange}
                />
              </div>
            </InputGroup>

            <InputGroup select={props.selected.includes("message")}>
              <label htmlFor="message" />
              <input
                type="text"
                placeholder="Message"
                name="message_text"
                value={props.productData.message_text}
                onChange={props.handleChange}
              />
              <div>
                <h3>editing</h3>
                <button
                  name="currentElement"
                  value="message"
                  onClick={props.handleElementChange}
                />
              </div>
            </InputGroup>

            <InputGroup select={props.selected.includes("button")}>
              <label htmlFor="button_text" />
              <input
                type="text"
                placeholder="CTA Button"
                name="button_text"
                value={props.productData.button_text}
                onChange={props.handleChange}
              />
              <div>
                <h3>editing</h3>
                <button
                  name="currentElement"
                  value="button"
                  onClick={props.handleElementChange}
                />
              </div>
            </InputGroup>
          </>
          }
          <InputGroup>
            <label htmlFor="destination_url" />
            <input
              type="text"
              placeholder="Destination Url"
              name="destination_url"
              value={props.productData.destination_url}
              onChange={props.handleChange}
              required
            />
          </InputGroup>
          {/* --------------------- image upload --------------------- */}
          <label htmlFor="back_img" />
          <ImageUpload
            accept="image/*"
            type="file"
            placeholder="Background Image"
            name="back_img"
            multiple
            onChange={props.handleFileChange}
          />
          {/* --------------------- image upload --------------------- */}
        </div>
      </Form>
    </>
  );
};

export default AdForm;
