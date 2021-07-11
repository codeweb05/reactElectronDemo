import './style.css'
import 'bootstrap/dist/css/bootstrap.min.css'
export default function ToggleSwitch({ onClick, isDarkMode }) {
	return (
		<>
			<label className="switch">
				<input type="checkbox" defaultChecked={isDarkMode} onChange={onClick} />
				<span className="slider round"></span>
			</label>
			<div className="mx-2">Switch to {isDarkMode ? 'Light' : 'Dark'}</div>
		</>
	)
}
