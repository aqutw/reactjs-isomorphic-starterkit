import React from "react";
import styles from "./footer.scss";

const Footer = (props) => {
	return(
		<footer className={styles.footer}>
			{props.children}
		</footer>
	);
};

Footer.propTypes = {
	//node = nombre, string, element ou un tableau contenant ces types:
	children: React.PropTypes.node.isRequired
};

export default Footer;
