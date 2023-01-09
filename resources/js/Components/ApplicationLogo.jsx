export default function ApplicationLogo({ className }) {
    return (
        <img
            className={`${className} box-border w-auto`}
            src="/assets/logo.png"
            alt="Laravel"
        />
    );
}
