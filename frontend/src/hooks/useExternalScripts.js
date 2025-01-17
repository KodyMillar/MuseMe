import React, { useEffect } from 'react';

export default function useExternalScripts(url) {
    useEffect(() => {
        console.log(`ADDING SCRIPT FROM ${url}`);
        const script = document.createElement('script');

        script.setAttribute('src', url);
        script.setAttribute('type', 'text/javascript');
        script.defer = true;

        document.head.appendChild(script);

        return () => {
            document.head.removeChild(script);
        };
    }, [url]);
};