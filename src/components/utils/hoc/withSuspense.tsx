import React from "react";

export const withSuspense = (Component: React.ComponentType<any>): JSX.Element => (
    <React.Suspense fallback={<div>loading...</div>}>
        <Component />
    </React.Suspense>
)