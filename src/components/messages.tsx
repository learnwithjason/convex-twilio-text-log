import styles from './messages.module.css';

const Empty = () => {
	const phone = import.meta.env.VITE_TWILIO_PHONE_NUMBER;

	return (
		<div className={styles.empty}>
			<h1>Ready to start logging?</h1>
			<p>
				Text a photo and any details or description you want to include about it
				to:
				<a href={`sms:${phone}`}>{phone}</a>
				Send your first text to see it logged here!
			</p>
		</div>
	);
};

export const Messages = () => {
	// TODO: load all messages from the currently logged in user
	const messages = [];

	return (
		<section className={styles.wrapper}>
			{messages.length > 0 ? (
				<ul className={styles.messages}>{/* TODO: display messages */}</ul>
			) : (
				<Empty />
			)}
		</section>
	);
};
