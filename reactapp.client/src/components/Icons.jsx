// icons.jsx
import React from "react";

 const Speedometer2 = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="currentColor"
        viewBox="0 0 24 24"
    >
        <path d="M16 11c1.656 0 3-1.344 3-3s-1.344-3-3-3-3 1.344-3 3 1.344 3 3 3zM8 11c1.656 0 3-1.344 3-3S9.656 5 8 5 5 6.344 5 8s1.344 3 3 3zM8 13c-2.667 0-8 1.334-8 4v3h16v-3c0-2.666-5.333-4-8-4zM16 13c-.293 0-.586.021-.878.063 1.29.938 2.378 2.318 2.878 3.937H22v-3c0-2.666-5.333-4-8-4z" />
    </svg>
);

const UsersIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
)


const Icons = {
    Users: UsersIcon,
    Speedometer2: Speedometer2,
    TrendingUp: TrendingUpIcon,
};

export default Icons;