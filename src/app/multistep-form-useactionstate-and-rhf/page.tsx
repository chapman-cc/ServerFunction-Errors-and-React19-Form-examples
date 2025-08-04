import { TicketBookingStep } from "./types";
import { Complete } from "./mini-forms/Complete";
import { Review } from "./mini-forms/Review";
import { Reservation } from "./mini-forms/Reservation";
import {
  BookingTicketFormError,
  BookingTicketProviders,
  BookingTicketStepStepper,
  MiniForm,
} from "./Providers";

export default function page() {
  return (
    <>
      <div>
        <BookingTicketProviders>
          <BookingTicketStepStepper />
          <BookingTicketFormError />

          <MiniForm matchingStep={TicketBookingStep.reservation}>
            <Reservation />
          </MiniForm>

          <MiniForm matchingStep={TicketBookingStep.review}>
            <Review />
          </MiniForm>

          <MiniForm matchingStep={TicketBookingStep.complete}>
            <Complete />
          </MiniForm>
        </BookingTicketProviders>
      </div>
      <noscript>Javascript is disabled</noscript>
    </>
  );
}
