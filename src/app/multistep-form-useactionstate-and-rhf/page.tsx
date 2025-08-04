import { BookingTicketProviders } from "./context";
import { MiniForm } from "./form-components/MiniForm";
import { BookingTicketFormError } from "./form-components/BookingTicketFormError";
import { BookingTicketStepStepper } from "./form-components/BookingTicketStepper";
import { Complete } from "./form-components/Complete";
import { Reservation } from "./form-components/Reservation";
import { Review } from "./form-components/Review";
import { Step } from "./types";

export default function page() {
  return (
    <>
      <div>
        <BookingTicketProviders>
          <BookingTicketStepStepper />

          <BookingTicketFormError />

          <MiniForm matchingStep={Step.reservation}>
            <Reservation />
          </MiniForm>

          <MiniForm matchingStep={Step.review}>
            <Review />
          </MiniForm>

          <MiniForm matchingStep={Step.complete}>
            <Complete />
          </MiniForm>
        </BookingTicketProviders>
      </div>
      <noscript>Javascript is disabled</noscript>
    </>
  );
}
function test(payload: string): boolean | Promise<boolean>;
function test(state: boolean, payload: string): boolean | Promise<boolean>;
function test(arg1: string | boolean, arg2?: string): boolean | Promise<boolean> {
return false
}
