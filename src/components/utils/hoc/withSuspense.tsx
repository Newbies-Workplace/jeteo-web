import React from "react";

export const withSuspense = (Component: React.ComponentType<any>, fallback?: React.ReactNode ): JSX.Element => (
    <React.Suspense fallback={fallback ?? <div>Loading...</div>}>
        <Component />
    </React.Suspense>
)