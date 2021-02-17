import React from 'react';

export interface IconTypes {
	selectTool: React.ReactElement;
	handTool: React.ReactElement;
	directTool: React.ReactElement;
	rectTool: React.ReactElement;
	windowTool: React.ReactElement;
	doorTool: React.ReactElement;
	balconyDoorTool: React.ReactElement;
	interiorsTool: React.ReactElement;
	adjustmentTool: React.ReactElement;

	undo: React.ReactElement;
	redo: React.ReactElement;
}

export const icons: IconTypes = {
	selectTool: <React.Fragment></React.Fragment>,

	handTool: <React.Fragment></React.Fragment>,

	directTool: (
		<React.Fragment>
			<path
				d="M24.9971 6.25183C24.9906 4.52644 23.5866 3.13298 21.8612 3.13948C20.6338 3.14406 19.5228 3.867 19.0214 4.98734L16.3542 4.54137L16.0933 6.08234L18.7738 6.52987C18.8781 7.69214 19.6215 8.69938 20.7014 9.14163L19.9407 14.8799C18.3738 15.064 17.1914 16.3896 17.1868 17.9673V17.979L8.18229 20.3533C7.702 19.4971 6.84551 18.918 5.872 18.7912L4.27714 6.02689C5.03586 5.72473 5.64653 5.13813 5.979 4.3922L8.39316 4.79521L8.65012 3.25502L6.22425 2.84966C6.07678 1.13492 4.5671 -0.135622 2.85235 0.0118943C1.1376 0.159362 -0.132937 1.66899 0.0145799 3.38374C0.140374 4.84632 1.26984 6.02274 2.72602 6.20809L4.32244 18.9701C2.71797 19.6046 1.93162 21.4197 2.56615 23.0242C3.20069 24.6287 5.01575 25.415 6.62023 24.7805C7.8133 24.3086 8.59662 23.1554 8.59545 21.8724V21.8607L17.5999 19.4864C18.4387 20.9893 20.3369 21.5277 21.8398 20.689C23.3427 19.8503 23.8811 17.952 23.0424 16.4491C22.6956 15.8276 22.1464 15.3436 21.4863 15.0775L22.2471 9.33923C23.8124 9.15325 24.9927 7.82819 24.9971 6.25183ZM3.12825 4.68977C2.26555 4.68977 1.56619 3.99041 1.56619 3.12771C1.56619 2.26502 2.26555 1.56565 3.12825 1.56565C3.99094 1.56565 4.69031 2.26502 4.69031 3.12771C4.69031 3.99041 3.99094 4.68977 3.12825 4.68977ZM5.47134 23.4345C4.60864 23.4345 3.90928 22.7351 3.90928 21.8724C3.90928 21.0097 4.60864 20.3103 5.47134 20.3103C6.33403 20.3103 7.03339 21.0097 7.03339 21.8724C7.03339 22.7351 6.33403 23.4345 5.47134 23.4345ZM21.8729 17.9673C21.8729 18.83 21.1736 19.5293 20.3109 19.5293C19.4482 19.5293 18.7488 18.83 18.7488 17.9673C18.7488 17.1046 19.4482 16.4052 20.3109 16.4052C21.1736 16.4052 21.8729 17.1046 21.8729 17.9673ZM20.3109 6.25183C20.3109 5.38913 21.0102 4.68977 21.8729 4.68977C22.7356 4.68977 23.435 5.38913 23.435 6.25183C23.435 7.11452 22.7356 7.81388 21.8729 7.81388C21.0102 7.81388 20.3109 7.11452 20.3109 6.25183Z"
				fill="currentColor"
			/>
			<path
				d="M14.8132 4.28519L13.2725 4.02808L13.0154 5.56889L14.5561 5.826L14.8132 4.28519Z"
				fill="currentColor"
			/>
			<path
				d="M11.7277 3.77061L10.187 3.51318L9.92958 5.05384L11.4702 5.31127L11.7277 3.77061Z"
				fill="currentColor"
			/>
		</React.Fragment>
	),

	rectTool: (
		<React.Fragment>
			<path d="M2,2 L23,2 L23,4 L2,4" fill="currentColor" />
			<path d="M21,4 L21,23 L23,23 L23,4" fill="currentColor" />
			<path d="M21,23 L2,23 L2,21 L21,21" fill="currentColor" />
			<path d="M2,4 L2,21 L4,22 L4,4" fill="currentColor" />
		</React.Fragment>
	),

	windowTool: (
		<React.Fragment>
			<path
				d="M25 2.5V0H0V2.5H0.833333V22.5H0V25H25V22.5H24.1667V2.5H25ZM0.833333 0.833333H24.1667V1.66667H0.833333V0.833333ZM24.1667 24.1667H0.833333V23.3333H24.1667V24.1667ZM23.3333 22.5H1.66667V2.5H23.3333V22.5Z"
				fill="currentColor"
			/>
			<path
				d="M12.0833 12.9167H2.5V21.6667H12.0833V12.9167ZM11.25 20.8334H3.33333V13.75H11.25V20.8334Z"
				fill="currentColor"
			/>
			<path
				d="M22.4998 12.9167H12.9165V21.6667H22.4998V12.9167ZM21.6665 20.8334H13.7498V13.75H21.6665V20.8334Z"
				fill="currentColor"
			/>
			<path
				d="M22.4998 3.33331H12.9165V12.0833H22.4998V3.33331ZM21.6665 11.25H13.7498V4.16665H21.6665V11.25Z"
				fill="currentColor"
			/>
			<path
				d="M12.0833 3.33331H2.5V12.0833H12.0833V3.33331ZM11.25 11.25H3.33333V4.16665H11.25V11.25Z"
				fill="currentColor"
			/>
		</React.Fragment>
	),

	doorTool: (
		<React.Fragment>
			<path
				d="M21.1864 22.8814V0.423729C21.1864 0.416949 21.1839 0.410593 21.1835 0.403814C21.1826 0.383051 21.1784 0.362712 21.1742 0.341949C21.1699 0.321186 21.1661 0.300424 21.1589 0.280508C21.1568 0.274153 21.1568 0.267373 21.1542 0.261441C21.1492 0.248729 21.1398 0.238983 21.1335 0.227119C21.1233 0.208051 21.1131 0.189407 21.1004 0.172034C21.0881 0.155508 21.0742 0.141102 21.0597 0.126695C21.0453 0.112288 21.0309 0.0983051 21.0144 0.086017C20.997 0.0728814 20.9784 0.0631356 20.9593 0.0529661C20.9475 0.0466102 20.9377 0.0377119 20.925 0.0322034C20.9186 0.029661 20.9119 0.029661 20.9055 0.0275424C20.886 0.020339 20.8661 0.0165254 20.8453 0.0122881C20.8237 0.00805084 20.8025 0.00381355 20.7809 0.00254237C20.775 0.00254237 20.7691 0 20.7627 0H4.66102C4.65466 0 4.64873 0.00254239 4.64237 0.00296611C4.62034 0.00381357 4.59915 0.00805084 4.57754 0.0127119C4.5572 0.0169491 4.53729 0.0207627 4.51822 0.0275424C4.51186 0.029661 4.50508 0.029661 4.49873 0.0322034C4.48602 0.0372881 4.47627 0.0466102 4.46441 0.0529661C4.44534 0.0631356 4.42669 0.0733051 4.40932 0.086017C4.3928 0.0983051 4.37839 0.112288 4.36398 0.126695C4.34958 0.141102 4.33559 0.155508 4.32331 0.172034C4.31059 0.189407 4.30042 0.208051 4.29025 0.227119C4.2839 0.238983 4.275 0.248729 4.26949 0.261441C4.26695 0.267797 4.26695 0.274576 4.26483 0.280508C4.25763 0.300424 4.25381 0.320763 4.24958 0.341949C4.24534 0.362712 4.2411 0.383051 4.24025 0.403814C4.23983 0.410593 4.23729 0.416949 4.23729 0.423729V22.8814H0V25H4.66102H5.08475H5.50847H5.9322H19.4915H19.9153H20.339H20.7627H25.4237V22.8814H21.1864ZM19.7398 0.847458L19.3161 1.27119H6.10763L5.6839 0.847458H19.7398ZM0.847458 23.7288H4.23729V24.1525H0.847458V23.7288ZM5.50847 24.1525H5.08475V22.8814V1.44661L5.50847 1.87034V24.1525ZM6.35593 2.11864H19.0678V24.1525H6.35593V2.11864ZM20.339 24.1525H19.9153V1.87034L20.339 1.44661V22.8814V24.1525ZM24.5763 24.1525H21.1864V23.7288H24.5763V24.1525Z"
				fill="currentColor"
			/>
			<path
				d="M18.2207 12.7116H16.5258C16.2919 12.7116 16.1021 12.901 16.1021 13.1353C16.1021 13.3697 16.2919 13.5591 16.5258 13.5591H18.2207C18.4546 13.5591 18.6444 13.3697 18.6444 13.1353C18.6444 12.901 18.4546 12.7116 18.2207 12.7116Z"
				fill="currentColor"
			/>
		</React.Fragment>
	),

	balconyDoorTool: (
		<React.Fragment>
			<path
				d="M24.675 20.7153H0.324957C0.145451 20.7153 0 20.5699 0 20.3904V19.0039C0 18.8243 0.145451 18.6789 0.324957 18.6789H0.720365V9.75349H0.324957C0.145451 9.75349 0 9.60804 0 9.42853C0 9.24903 0.145451 9.10358 0.324957 9.10358H6.78862V0.611273C6.78862 0.431767 6.93407 0.286316 7.11357 0.286316H17.8022C17.9817 0.286316 18.1272 0.431767 18.1272 0.611273V9.10345H24.675C24.8545 9.10345 25 9.2489 25 9.4284C25 9.60791 24.8545 9.75336 24.675 9.75336H24.2906V18.6789H24.675C24.8545 18.6789 25 18.8243 25 19.0039V20.3904C25 20.5699 24.8545 20.7153 24.675 20.7153ZM0.649915 20.0654H24.3501V19.3288H0.649915V20.0654ZM22.5358 18.6789H23.6406V9.75349H22.5358V18.6789ZM20.379 18.6789H21.8859V9.75349H20.379V18.6789ZM18.2222 18.6789H19.7291V9.75349H18.2222V18.6789ZM16.0655 18.6789H17.4772V9.75349H16.0655V18.6789ZM13.9087 18.6789H15.4156V9.75349H13.9087V18.6789ZM11.752 18.6789H13.2588V9.75349H11.752V18.6789ZM9.59521 18.6789H11.1021V9.75349H9.59521V18.6789ZM7.43853 18.6789H8.94542V9.75349H7.43853V18.6789ZM5.28172 18.6789H6.78849V9.75349H5.28172V18.6789ZM3.12505 18.6789H4.63194V9.75349H3.12505V18.6789ZM1.37028 18.6789H2.47513V9.75349H1.37028V18.6789ZM16.7257 9.10358H17.4772V0.93623H7.43853V9.10345H8.19022V2.01938C8.19022 1.83987 8.33567 1.69442 8.51518 1.69442H11.8515C12.031 1.69442 12.1764 1.83987 12.1764 2.01938V9.10345H12.7396V2.01938C12.7396 1.83987 12.8851 1.69442 13.0646 1.69442H16.4009C16.5804 1.69442 16.7258 1.83987 16.7258 2.01938V9.10358H16.7257ZM13.3894 9.09981H16.0758V2.34447H13.3894V9.09981ZM8.84001 9.09981H11.5264V2.34447H8.84001V9.09981Z"
				fill="currentColor"
			/>
		</React.Fragment>
	),

	interiorsTool: (
		<React.Fragment>
			<path
				d="M18.8242 10.3516H10.7676V4.39453H11.5C11.9045 4.39453 12.2324 4.0666 12.2324 3.66211V2.19727C12.2324 0.985693 11.2467 0 10.0352 0H2.71094C1.49937 0 0.513672 0.985693 0.513672 2.19727V3.66211C0.513672 4.0666 0.841602 4.39453 1.24609 4.39453H1.97852V12.5488C1.97852 13.5037 2.59087 14.3178 3.44336 14.6201V16.9434C3.44336 18.6261 4.58418 20.0474 6.13296 20.4744L4.9458 24.036C4.87139 24.2593 4.90879 24.5049 5.04648 24.6959C5.18408 24.8868 5.40522 25 5.64062 25H14.4297C14.6651 25 14.8862 24.8868 15.0239 24.6959C15.1615 24.5049 15.199 24.2593 15.1246 24.036L13.9811 20.6055H14.4297C17.8168 20.6055 20.615 18.0374 20.9806 14.7461H21.7539C22.1584 14.7461 22.4863 14.4182 22.4863 14.0137C22.4863 11.9944 20.8435 10.3516 18.8242 10.3516ZM1.97852 2.92969V2.19727C1.97852 1.79341 2.30708 1.46484 2.71094 1.46484H10.0352C10.439 1.46484 10.7676 1.79341 10.7676 2.19727V2.92969C10.1313 2.92969 2.37285 2.92969 1.97852 2.92969ZM4.17578 13.2812C3.77192 13.2812 3.44336 12.9527 3.44336 12.5488V4.39453H9.30273V13.2812H4.17578ZM14.4297 19.1406H12.9648C12.7294 19.1406 12.5083 19.2538 12.3707 19.4448C12.233 19.6358 12.1956 19.8813 12.27 20.1046L13.4135 23.5352H6.65684L7.80034 20.1046C7.87476 19.8813 7.83735 19.6357 7.69966 19.4448C7.56201 19.2538 7.34087 19.1406 7.10547 19.1406C5.8939 19.1406 4.9082 18.1549 4.9082 16.9434V14.7412C5.54233 14.7412 18.86 14.7412 19.5041 14.7412C19.1476 17.2225 17.0081 19.1406 14.4297 19.1406ZM10.7676 13.2812V11.8164H18.8242C19.7792 11.8164 20.5937 12.4287 20.896 13.2812H10.7676Z"
				fill="currentColor"
			/>
		</React.Fragment>
	),

	adjustmentTool: (
		<React.Fragment>
			<path
				d="M0.801282 4.54869H4.99306C5.3485 5.89976 6.58024 6.89912 8.04124 6.89912C9.50224 6.89912 10.734 5.89976 11.0894 4.54869H24.1987C24.6412 4.54869 25 4.18993 25 3.74741C25 3.30489 24.6412 2.94613 24.1987 2.94613H11.0893C10.7339 1.59506 9.50214 0.595703 8.04113 0.595703C6.58013 0.595703 5.3484 1.59506 4.99295 2.94613H0.801282C0.358761 2.94613 0 3.30489 0 3.74741C0 4.18993 0.358761 4.54869 0.801282 4.54869ZM8.04124 2.19827C8.89541 2.19827 9.59038 2.89325 9.59038 3.74741C9.59038 4.60158 8.89541 5.29656 8.04124 5.29656C7.18707 5.29656 6.49209 4.60158 6.49209 3.74741C6.49209 2.89325 7.18707 2.19827 8.04124 2.19827Z"
				fill="currentColor"
			/>
			<path
				d="M24.1987 2.69857H18.8579C18.5025 1.3475 17.2707 0.348145 15.8097 0.348145C14.3487 0.348145 13.117 1.3475 12.7615 2.69857H0.801282C0.358761 2.69857 0 3.05733 0 3.49985C0 3.94237 0.358761 4.30114 0.801282 4.30114H12.7616C13.1171 5.6521 14.3488 6.65156 15.8098 6.65156C17.2708 6.65156 18.5026 5.6521 18.858 4.30114H24.1988C24.6413 4.30114 25.0001 3.94237 25.0001 3.49985C25.0001 3.05733 24.6412 2.69857 24.1987 2.69857ZM15.8098 5.049C14.9557 5.049 14.2607 4.35402 14.2607 3.49985C14.2607 2.64569 14.9557 1.95071 15.8098 1.95071C16.664 1.95071 17.359 2.64569 17.359 3.49985C17.359 4.35402 16.664 5.049 15.8098 5.049Z"
				transform="translate(0, 8)"
				fill="currentColor"
			/>
			<path
				d="M0.801282 4.54869H4.99306C5.3485 5.89976 6.58024 6.89912 8.04124 6.89912C9.50224 6.89912 10.734 5.89976 11.0894 4.54869H24.1987C24.6412 4.54869 25 4.18993 25 3.74741C25 3.30489 24.6412 2.94613 24.1987 2.94613H11.0893C10.7339 1.59506 9.50214 0.595703 8.04113 0.595703C6.58013 0.595703 5.3484 1.59506 4.99295 2.94613H0.801282C0.358761 2.94613 0 3.30489 0 3.74741C0 4.18993 0.358761 4.54869 0.801282 4.54869ZM8.04124 2.19827C8.89541 2.19827 9.59038 2.89325 9.59038 3.74741C9.59038 4.60158 8.89541 5.29656 8.04124 5.29656C7.18707 5.29656 6.49209 4.60158 6.49209 3.74741C6.49209 2.89325 7.18707 2.19827 8.04124 2.19827Z"
				transform="translate(0, 16)"
				fill="currentColor"
			/>
		</React.Fragment>
	),

	undo: (
		<React.Fragment>
			<path
				d="M15.6331 4.6591C15.6059 4.6591 2.01077 4.6591 2.01077 4.6591L4.87506 1.44868C5.0608 1.24047 5.0426 0.921138 4.83439 0.735397C4.62627 0.549694 4.30686 0.567819 4.12112 0.776061L0.895263 4.39168C0.502334 4.83222 0.502373 5.49644 0.895302 5.93687L4.12115 9.55253C4.221 9.66444 4.35932 9.72139 4.49826 9.72139C4.61795 9.72139 4.73807 9.67909 4.83443 9.59319C5.04264 9.40745 5.0608 9.08811 4.8751 8.87991L2.01081 5.66945C2.01081 5.66945 15.6059 5.66945 15.6332 5.66945C17.8151 5.66945 19.5902 7.4446 19.5902 9.62647C19.5902 11.8083 17.8151 13.5835 15.6332 13.5835H13.2277C12.9487 13.5835 12.7225 13.8097 12.7225 14.0887C12.7225 14.3677 12.9487 14.5939 13.2277 14.5939H15.6332C18.3722 14.5939 20.6006 12.3655 20.6006 9.62647C20.6005 6.88745 18.3722 4.6591 15.6331 4.6591Z"
				fill="currentColor"
			/>
		</React.Fragment>
	),

	redo: (
		<React.Fragment>
			<path
				d="M5.36688 4.6591C5.39414 4.6591 18.9892 4.6591 18.9892 4.6591L16.1249 1.44868C15.9392 1.24047 15.9574 0.921138 16.1656 0.735397C16.3737 0.549694 16.6931 0.567819 16.8789 0.776061L20.1047 4.39168C20.4977 4.83222 20.4976 5.49644 20.1047 5.93687L16.8788 9.55253C16.779 9.66444 16.6407 9.72139 16.5017 9.72139C16.3821 9.72139 16.2619 9.67909 16.1656 9.59319C15.9574 9.40745 15.9392 9.08811 16.1249 8.87991L18.9892 5.66945C18.9892 5.66945 5.39414 5.66945 5.36684 5.66945C3.18489 5.66945 1.40982 7.4446 1.40982 9.62647C1.40982 11.8083 3.18493 13.5835 5.36684 13.5835H7.7723C8.05133 13.5835 8.2775 13.8097 8.2775 14.0887C8.2775 14.3677 8.05133 14.5939 7.7723 14.5939H5.36684C2.62778 14.5939 0.399429 12.3655 0.399429 9.62647C0.399467 6.88745 2.62782 4.6591 5.36688 4.6591Z"
				fill="currentColor"
			/>
		</React.Fragment>
	)
};