import React from 'react';
import { render, fireEvent, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import Carousel from "./Carousel";
import TEST_IMAGES from "./_testCommon.js";

describe('Carousel Features', () => {
  it("Hides the left arrow for the first photo.", () => {
    render(<Carousel photos={TEST_IMAGES} title="Photos for testing" />);
    expect(screen.queryByRole('button', {name: /left/i})).not.toBeInTheDocument();
    expect(screen.getByRole('button', {name: /right/i})).toBeInTheDocument();
  });

  it("Hides the right arrow for the last photo.", () => {
    render(<Carousel photos={TEST_IMAGES} title="Photos for testing" />);
    expect(screen.getByAltText("testing image 1")).toBeInTheDocument();
    expect(screen.queryByAltText("testing image 2")).not.toBeInTheDocument();

    const rightArrow = screen.getByRole('button', {name: /right/i});

    fireEvent.click(rightArrow);
    expect(screen.queryByAltText("testing image 1")).not.toBeInTheDocument();
    expect(screen.getByAltText("testing image 2")).toBeInTheDocument();

    fireEvent.click(rightArrow);
    expect(screen.queryByRole('button', {name: /right/i})).not.toBeInTheDocument();
  });

  it("Shows the left arrow for the second photo.", () => {
    render(<Carousel photos={TEST_IMAGES} title="Photos for testing" />);
    expect(screen.queryByRole('button', {name: /left/i})).not.toBeInTheDocument();

    const rightArrow = screen.getByRole('button', {name: /right/i});
    fireEvent.click(rightArrow);
    expect(screen.getByRole('button', {name: /left/i})).toBeInTheDocument();
  });
});


