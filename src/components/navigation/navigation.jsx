import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import "./navigation.css";

export default function Navigation() {
    const [isOpen, setIsOpen] = useState(false);
    const navigationRef = useRef(null);
    const toggleRef = useRef(null);

    useEffect(() => {
        if (!isOpen) return;

        function handlePointerDown(event) {
            if (!navigationRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }

        function handleKeyDown(event) {
            if (event.key === "Escape") {
                setIsOpen(false);
                toggleRef.current.focus();
            }
        }

        const desktopQuery = window.matchMedia("(min-width: 768px)");
        function handleBreakpointChange(event) {
            if (event.matches) setIsOpen(false);
        }

        document.addEventListener("pointerdown", handlePointerDown);
        document.addEventListener("keydown", handleKeyDown);
        desktopQuery.addEventListener("change", handleBreakpointChange);

        return () => {
            document.removeEventListener("pointerdown", handlePointerDown);
            document.removeEventListener("keydown", handleKeyDown);
            desktopQuery.removeEventListener("change", handleBreakpointChange);
        };
    }, [isOpen]);

    return (
        <nav
            className="navigation"
            aria-label="Primary navigation"
            ref={navigationRef}
            onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) {
                    setIsOpen(false);
                }
            }}
        >
            <button
                className="navigation-toggle"
                type="button"
                aria-label={isOpen ? "Close navigation" : "Open navigation"}
                aria-expanded={isOpen}
                aria-controls="primary-navigation-links"
                onClick={() => setIsOpen(!isOpen)}
                ref={toggleRef}
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                        d={isOpen ? "M6 6L18 18M6 18L18 6" : "M4 6H20M4 12H20M4 18H20"}
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                    />
                </svg>
            </button>
            <div
                id="primary-navigation-links"
                className={`navigation-capsule${isOpen ? " navigation-capsule-open" : ""}`}
                onClick={(event) => {
                    if (event.target.closest("a")) setIsOpen(false);
                }}
            >
                <NavLink to="/home" className={({ isActive }) =>
                    isActive ? "nav-link nav-link-active" : "nav-link"}>
                    Home
                </NavLink>
                <NavLink to="/about" className={({ isActive }) =>
                    isActive ? "nav-link nav-link-active" : "nav-link"}>
                    About
                </NavLink>
                <NavLink to="/projects" className={({ isActive }) =>
                    isActive ? "nav-link nav-link-active" : "nav-link"}>
                    Projects
                </NavLink>
                <NavLink to="/consulting" className={({ isActive }) =>
                    isActive ? "nav-link nav-link-active" : "nav-link"}>
                    Consulting
                </NavLink>
                <NavLink to="/contact" className={({ isActive }) =>
                    isActive ? "nav-link nav-link-active" : "nav-link"
                }>
                    Contact
                </NavLink>
                <NavLink to="/photos" className={({ isActive }) =>
                    isActive ? "nav-link nav-link-active" : "nav-link"}>
                    Photos
                </NavLink>
            </div>
        </nav>
    );
};
