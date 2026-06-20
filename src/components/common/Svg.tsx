import type { SVGProps } from "react";

export function AppointmentsCalendar(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 14 14"
      {...props}
    >
      {/* Icon from Streamline by Streamline - https://creativecommons.org/licenses/by/4.0/ */}
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M4.125.875a.625.625 0 1 0-1.25 0V2H2A1.625 1.625 0 0 0 .375 3.625v8.25A1.625 1.625 0 0 0 2 13.5h10a1.625 1.625 0 0 0 1.625-1.625v-8.25A1.625 1.625 0 0 0 12 2h-.875V.875a.625.625 0 1 0-1.25 0V2h-5.75zm5.75 3V3.25h-5.75v.625a.625.625 0 1 1-1.25 0V3.25H2a.375.375 0 0 0-.375.375v8.25A.375.375 0 0 0 2 12.25h10a.375.375 0 0 0 .375-.375v-8.25A.375.375 0 0 0 12 3.25h-.875v.625a.625.625 0 1 1-1.25 0M5.832 5.614c0-.201.163-.364.364-.364h1.608c.201 0 .364.163.364.364v1.343h1.343c.201 0 .364.163.364.364v1.608a.364.364 0 0 1-.364.364H8.168v1.343a.364.364 0 0 1-.364.364H6.196a.364.364 0 0 1-.364-.364V9.293H4.489a.364.364 0 0 1-.364-.364V7.321c0-.201.163-.364.364-.364h1.343z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function ArrowRightDown(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      {/* Icon from Solar by 480 Design - https://creativecommons.org/licenses/by/4.0/ */}
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2M9.75 15c0 .414.336.75.75.75H15a.75.75 0 0 0 .75-.75v-4.5a.75.75 0 0 0-1.5 0v2.69L9.53 8.47a.75.75 0 0 0-1.06 1.06l4.72 4.72H10.5a.75.75 0 0 0-.75.75"
        clipRule="evenodd"
      />
    </svg>
  );
}
