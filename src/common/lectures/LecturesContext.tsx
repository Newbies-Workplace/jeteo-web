import React, {createContext} from 'react';

interface LecturesContextInteraface {
    lectures: LecturesContextInteraface[],
}

export const LecturesContext = createContext<LecturesContextInteraface>({
    lectures: []
});

export const LectureProvider: React.FC = ({/* axios ,*/ children}) => {


    return (
        <LecturesContext.Provider
            value={{lectures: []}}
        >
            {children}
        </LecturesContext.Provider>
    )
}