import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
	return (
		<div className="footer">
			<div className="footer_heading">
				E-Commerce MERN Application for Mugs (
				<div
					className="footer__onCopyRights"
					onClick={() => window.open('https://www.instagram.com/hari_karthyk/')}
				>
					<i>&#169; hari_karthyk</i>
				</div>
				)
			</div>
		</div>
	);
}

export default Footer;
