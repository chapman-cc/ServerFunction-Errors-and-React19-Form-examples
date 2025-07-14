import Link from "next/link";

export default function Home() {
  return (
    <div>
      <ol>
        <li>
          <p>
            <Link href="/throw-generic-error">
              Server actions throwing generic error
            </Link>
          </p>
        </li>

        <li>
          <p>
            <Link href="/throw-generic-error-with-error-boundary">
              Server function throwing generic error caught by error boundary
            </Link>
          </p>
        </li>

        <li>
          <p>
            <Link href="/throw-custom-error">
              Server function throwing custom error with more details
            </Link>
          </p>
        </li>

        <li>
          <p>
            <Link href="/throw-custom-error-with-error-boundary">
              Server function throwing custom error caught by error boundary
            </Link>
          </p>
        </li>

        <li>
          <p>
            <Link href="/throw-error-in-form-action">
              form action invoke server function and throw generic error
            </Link>
          </p>
        </li>

        <li>
          <p>
            <Link href="/form-error-with-useactionstate">
              form action invoke server function with useActionState
            </Link>
          </p>
        </li>

        <li>
          <p>
            <Link href="/react-hook-form-tuple-server-functions">
              React Hook Form with server actions returning tuple
            </Link>
          </p>
        </li>

        <li>
          <p>
            <Link href="/single-button-example">
              Single button form with useActionState
            </Link>
          </p>
        </li>

        <li>
          <p>
            <Link href="/multistep-form-useactionstate">
              MultiStep form with useActionState
            </Link>
          </p>
        </li>
        <li>
          <p>
            <Link href="/multistep-form-useactionstate-and-rhf">
              MultiStep form with useActionState and React Hook Form
            </Link>
          </p>
        </li>
      </ol>

      <img
        src="https://upload.wikimedia.org/wikipedia/en/4/44/I_am_Error.png"
        alt="I am error"
      />
    </div>
  );
}
