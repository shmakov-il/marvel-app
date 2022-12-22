const Spinner = () => {
    return (

        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="183"
            height="24"
            version="1"
            viewBox="0 0 457 60"
            style={{margin: '0 auto'}}
        >
            <rect width="100%" height="100%" fill="#FFF"></rect>
            <g>
                <circle cx="-31" cy="30" r="30" fill="#dd1d1d"></circle>
                <circle cx="-97" cy="30" r="24" fill="#e44949"></circle>
                <circle cx="-163" cy="30" r="19" fill="#ea7676"></circle>
                <circle cx="-229.5" cy="30.5" r="13.5" fill="#f8cece"></circle>
                <circle cx="-295" cy="31" r="11" fill="#fbe4e4"></circle>
                <animateTransform
                    attributeName="transform"
                    calcMode="discrete"
                    dur="1920ms"
                    repeatCount="indefinite"
                    type="translate"
                    values="61 0;127 0;193 0;259 0;325 0;391 0;457 0;523 0;589 0;655 0;721 0;787 0;0 0;0 0;0 0;0 0;0 0;0 0;0 0;0 0;0 0;0 0;0 0;"
                ></animateTransform>
            </g>
            <g>
                <circle cx="488" cy="30" r="30" fill="#dd1d1d"></circle>
                <circle cx="554" cy="30" r="24" fill="#e44949"></circle>
                <circle cx="620" cy="30" r="19" fill="#ea7676"></circle>
                <circle cx="686.5" cy="30.5" r="13.5" fill="#f8cece"></circle>
                <circle cx="753" cy="31" r="11" fill="#fbe4e4"></circle>
                <animateTransform
                    attributeName="transform"
                    calcMode="discrete"
                    dur="1920ms"
                    repeatCount="indefinite"
                    type="translate"
                    values="0 0;0 0;0 0;0 0;0 0;0 0;0 0;0 0;0 0;0 0;0 0;-61 0;-127 0;-193 0;-259 0;-325 0;-391 0;-457 0;-523 0;-589 0;-655 0;-721 0;-787 0;"
                ></animateTransform>
            </g>
        </svg>

    )
}

export default Spinner;