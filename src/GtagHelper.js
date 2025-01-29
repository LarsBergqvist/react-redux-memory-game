class GtagHelper {
    static sendEvent(eventName, eventParams) {
        if (window.gtag && window.dataLayer) {
            window.gtag('event', eventName, eventParams);
        } else {
            console.warn('GA4 is not loaded. Event not sent:', eventName, eventParams);
        }
    }
}

export default GtagHelper;
