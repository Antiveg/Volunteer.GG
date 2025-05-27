'use client'
import React, { useState } from 'react';
import EventCardBig from './eventcard_big'
import { Event } from '../types/event'

interface Props {
  events: Event[]
}

const EventCarousel = ({ events } : Props) => {

  const [currentIndex, setCurrentIndex] = useState(0);

  // Define layout constants
  const MAIN_CARD_WIDTH = 700; // width of EventCardBig in pixels
  const PEEK_WIDTH = 30; // How much of the adjacent cards is visible on each side (pixels)
  const SLIDE_MARGIN = 20; // Margin between cards in the track (pixels)

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? events.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === events.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  if (!events || events.length === 0) {
    return <div className="text-center text-gray-500 py-5">No events to display.</div>;
  }

  // Calculate the translateX value for the track
  const offset = currentIndex * (MAIN_CARD_WIDTH + SLIDE_MARGIN)
  const transformValue = `translateX(calc(-${offset}px + ${PEEK_WIDTH}px))`

  return (
    <div className="relative flex items-center justify-center h-full w-full overflow-hidden">
      {events.length > 1 && (
        <button
          onClick={goToPrevious}
          className="absolute h-full left-0 p-2 w-8 bg-gray-200/25 hover:bg-gray-300/75 text-gray-800 z-50"
          aria-label="Previous event"
        >
          &#10094; {/* Left Arrow */}
        </button>
      )}
      <div className="overflow-hidden h-full relative">
        <div
          className="flex transition-transform duration-500 ease-out h-full"
          style={{ transform: transformValue }}
        >
          {events.map((event, index) => (
            <div
              className="flex-none mr-5 last:mr-0"
              key={event.id || index}
              aria-hidden={index !== currentIndex}
            >
              <EventCardBig event={event} />
            </div>
          ))}
          <div
          className="flex-none mr-5 last:mr-0"
          >
            <EventCardBig event={null} message="See more at below..."/>
          </div>
        </div>
      </div>
      {events.length > 1 && (
        <button
          onClick={goToNext}
          className="absolute h-full right-0 p-2 w-8 bg-gray-200/25 hover:bg-gray-300/75 text-gray-800 z-50"
          aria-label="Previous event"
        >
          &#10095; {/* Right Arrow */}
        </button>
      )}
    </div>
  );
};

export default EventCarousel