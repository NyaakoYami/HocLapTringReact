import { Outlet } from 'react-router-dom';

const LayoutHome = () => {
	return (
		<>
			<div className='container'>
				<Outlet />
			</div>
		</>
	);
};

export default LayoutHome;
