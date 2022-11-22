interface IconProps {
  className?: string;
}

export const PingPongIcon = (props: IconProps) => {
  const { className } = props;
  return (
    <>
      <svg
        version="1.1"
        id="PingPongIcon"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        viewBox="0 0 57.975 57.975"
        enableBackground="new 0 0 57.975 57.975"
        className={className}
      >
        <path
          id="handle"
          fill="#CBB292"
          d="M10.39,23.151c-0.167,2.943,0.41,5.903,1.767,8.819c0.83,1.782,1.141,3.785,0.667,5.693
	c-0.786,3.165-2.687,5.7-6.161,7.757c-1.371,0.812-2.72,1.664-3.983,2.635l-1.591,1.224c-0.926,0.712-1.014,2.075-0.188,2.901
	l5.229,5.229c0.835,0.835,2.215,0.734,2.92-0.213l1.646-2.213c0.862-1.158,1.633-2.385,2.353-3.636
	c1.994-3.463,4.414-5.368,7.478-6.204c1.879-0.513,3.866-0.233,5.654,0.54c2.741,1.186,5.522,1.699,8.29,1.549
	c0.195-0.011,0.286-0.255,0.148-0.393L10.784,23.004C10.646,22.866,10.401,22.956,10.39,23.151z"
        />
        <circle id="ball" fill="#ECF0F1" cx="18.003" cy="9.893" r="9" />
        <path
          id="ball_reflection"
          fill="#FFFFFF"
          d="M13.003,10.893c-0.553,0-1-0.447-1-1c0-3.309,2.691-6,6-6c0.553,0,1,0.447,1,1s-0.447,1-1,1
	c-2.206,0-4,1.794-4,4C14.003,10.445,13.555,10.893,13.003,10.893z"
        />
        <g>
          <path
            className="fill-purple-700"
            d="M52.004,5.634c-6.926-6.926-18.332-7.268-27.648-2.116c0.004,0.004,0.008,0.007,0.011,0.01
		c3.515,3.515,3.515,9.213,0,12.728c-3.392,3.392-8.813,3.5-12.347,0.345c-0.948,2.133-1.469,4.302-1.603,6.479
		c0.061-0.139,0.249-0.195,0.367-0.076l23.834,23.834c0.126,0.127,0.056,0.334-0.106,0.378c5.056-0.285,10.064-2.768,14.701-7.405
		C59.036,29.988,60.671,14.301,52.004,5.634z"
          />
        </g>
      </svg>
    </>
  );
};

export const Spinner = (props: IconProps) => {
  const { className } = props;

  return (
    <>
      <svg
        className="-ml-1 mr-3 h-5 w-5 animate-spin text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </>
  );
};
