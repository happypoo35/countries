import s from "./loading.module.scss";

const Loading = () => {
  return (
    <div className={s.loader}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 120 120"
        fill="currentColor"
      >
        <g>
          <path d="M38.5,87.5a6,6,0,0,1-4.24-1.76,36.43,36.43,0,0,1,0-51.48,6,6,0,0,1,8.48,8.48,24.45,24.45,0,0,0,0,34.52A6,6,0,0,1,38.5,87.5" />
          <path d="M81.5,87.5a6,6,0,0,1-4.24-10.24,24.45,24.45,0,0,0,0-34.52,6,6,0,1,1,8.34-8.63l.14.15a36.43,36.43,0,0,1,0,51.48A6,6,0,0,1,81.5,87.5" />
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 60 60"
            to="360 60 60"
            dur="1s"
            repeatCount="indefinite"
          />
        </g>
        <g>
          <path d="M60,120A60.07,60.07,0,0,1,0,60a6,6,0,0,1,12,0,48.05,48.05,0,0,0,48,48,6,6,0,0,1,0,12" />
          <path d="M114,66a6,6,0,0,1-6-6A48.05,48.05,0,0,0,60,12,6,6,0,0,1,60,0a60.07,60.07,0,0,1,60,60,6,6,0,0,1-6,6" />
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 60 60"
            to="360 60 60"
            dur="1.5s"
            repeatCount="indefinite"
          />
        </g>
      </svg>
    </div>
  );
};

export default Loading;
