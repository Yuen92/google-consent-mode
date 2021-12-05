import { html } from 'lit';
import { PageViewElement } from './page-view-element.js';

// These are the shared styles needed by this element.
import { SharedStyles } from './shared-styles.js';
import '@material/mwc-list/mwc-check-list-item.js';
import '@material/mwc-list/mwc-list.js';
import '@material/mwc-button/mwc-button.js';

class MyView1 extends PageViewElement {
  static get properties() {
    return {
      _consent: { type: Object },
      _gcmAdCookieConsent: { type: Boolean },
      _gcmAdDataRedactionConsent: { type: Boolean },
      _gmcAdsDataProcessingForRemarketingList: { type: Boolean },
      _gtagExecuted: { type: Boolean },
      _ga3Executed: { type: Boolean },
      _ga3CookieConsentChanged: { type: Boolean },
      _ga3Consent: { type: Boolean },
      _ga4Executed: { type: Boolean },
      _ga4CookieConsentChanged: { type: Boolean },
      _ga4Consent: { type: Boolean },
    };
  }

  static get styles() {
    return [
      SharedStyles
    ];
  }

  render() {
    return html`
      <section>
        <h2>Google Analytics</h2>
        <p>
          This page aims to audit the data collection of these softwares :
        </p>
        <ul>
          <li><a href="https://developers.google.com/analytics/devguides/collection/analyticsjs">Google Analytics 3 (Universal Analytics)</a></li>
          <li><a href="https://developers.google.com/analytics/devguides/collection/ga4">Google Analytics 4 (formerly known as “App + Web”)</a></li>
          <li><a href="https://support.google.com/analytics/answer/9976101">Google Consent Mode</a></li>
          <li><a href="https://support.google.com/analytics/answer/2700409">Google Signals</a></li>
        </ul>
      </section>
      <section>
        <h3>Google Consent Mode</h3>
        <p>
          Provide your consent to let this page use <a href="https://developers.google.com/analytics/devguides/collection/analyticsjs/cookie-usage#gtagjs_and_analyticsjs_universal_analytics_-_cookie_usage">cookies</a> with the <a href="https://developers.google.com/analytics/devguides/collection/analyticsjs">Google Analytics 3 (Universal Analytics)</a> and <a href="https://developers.google.com/analytics/devguides/collection/ga4">Google Analytics 4 (formerly known as “App + Web”)</a> data collection.
          <br>
          These <a href="https://developers.google.com/analytics/devguides/collection/analyticsjs/cookie-usage#gtagjs_google_analytics_4_-_cookie_usage">cookies</a> can be used :
        </p>
        <ul>
          <li>in order to count the number of users who see this page</li>
          <li>to include you in <a href="https://support.google.com/google-ads/answer/2453998">remarketing list (group of people with same criteria defined by the advertiser)</a> to personalized (i.e, include or exclude) advertisings you could see on the others websites</li>
          <li>to include you in <a href="https://support.google.com/google-ads/answer/2497941#similar">similar audiences (also known as lookalike)</a> to personalized (i.e, include or exclude) advertisings you could see on the others websites</li>
        </ul>
        <p>
          Google Consent Mode has limitations and doesn't let you the capability to use <a href="https://developers.google.com/analytics/devguides/collection/analyticsjs/cookie-usage#gtagjs_google_analytics_4_-_cookie_usage">cookies</a> only for <a href="https://developers.google.com/analytics/devguides/collection/analyticsjs">Google Analytics 3 (Universal Analytics)</a> or <a href="https://developers.google.com/analytics/devguides/collection/ga4">Google Analytics 4 (formerly known as “App + Web”)</a>. It means you can only grant or denied <a href="https://developers.google.com/analytics/devguides/collection/analyticsjs/cookie-usage#gtagjs_google_analytics_4_-_cookie_usage">cookies</a> usage for both at the same time.
          <br>
          This consent is required by the differents data privacy regulations (laws) like <a href="https://eur-lex.europa.eu/eli/reg/2016/679/oj"> General Data Privacy Regulation (known as GDPR)</a>, <a href="https://leginfo.legislature.ca.gov/faces/billTextClient.xhtml?bill_id=201720180SB1121">California Consumer Privacy Act (known as CCPA)</a> or <a href="https://www.serpro.gov.br/lgpd/menu/a-lgpd/o-que-muda-com-a-lgpd">Lei Geral de Proteção de Dados Pessoais(known as LGPD)</a>.
          <br>
          <mwc-list multi>
            <mwc-check-list-item @click="${ this._gcmAnalyticsCookiesConsentChanged }">Enable cookies to count the number of users for analytics</mwc-check-list-item>
            <mwc-check-list-item ?selected=${ this._gcmAnalyticsCookieConsent } disabled>Google Analytics 3 uses cookie to count users</mwc-check-list-item>
            <mwc-check-list-item ?selected=${ this._gcmAnalyticsCookieConsent } disabled>Google Analytics 4 uses cookie to count users</mwc-check-list-item>
            <mwc-check-list-item @click="${ this._gcmAdCookieConsentChanged }" >Enable cookies to measure ads performance</mwc-check-list-item>
            <mwc-check-list-item @click="${ this._gmcAdsDataProcessingForRemarketingListChanged }" >Enable cookies to build remarketing list and similar audiences</mwc-check-list-item>
            <mwc-check-list-item @click="${ this._gcmGoogleSignalsConsentChanged }" >Enable allow_google_signals</mwc-check-list-item>
            <mwc-check-list-item @click="${ this._gcmAdPersonalizationSignalsConsentChanged }" >Enable allow_ad_personalization_signals</mwc-check-list-item>
          </mwc-list>
        </p>
        <p>
          Provide your consent to let this page send <a href="https://developers.google.com/tag-platform/devguides/consent#redact_ads_data">ads data included in the url to the ads data collection</a> and add <a href="https://developers.google.com/tag-platform/devguides/consent#ad_click_information">url query parameters</a> to its links in order to share the ads click informations with the landing page (destination of the link).
          <br>
          <mwc-list multi>
            <mwc-check-list-item @click="${ this._gcmAdDataRedactionConsentChanged }" >Enable ads_data_redaction</mwc-check-list-item>
            <mwc-check-list-item @click="${ this._gcmAdClickDataUrlPassthroughConsentChanged }" >Enable url query parameter to measure ads performance</mwc-check-list-item>
          </mwc-list>
        </p>
      </section>
      <section>
        <h3>Google Analytics 3 (Universal Analytics)</h3>
        <p>
          Provide your consent to let this page use <a href="https://developers.google.com/analytics/devguides/collection/analyticsjs">Google Analytics 3 (Universal Analytics)</a>.
          <br>
          This consent is required by the differents data privacy regulations (laws) like <a href="https://eur-lex.europa.eu/eli/reg/2016/679/oj">General Data Privacy Regulation (known as GDPR)</a>, <a href="https://leginfo.legislature.ca.gov/faces/billTextClient.xhtml?bill_id=201720180SB1121">California Consumer Privacy Act (known as CCPA)</a> or <a href="https://www.serpro.gov.br/lgpd/menu/a-lgpd/o-que-muda-com-a-lgpd">Lei Geral de Proteção de Dados Pessoais(known as LGPD)</a>.
          <br>
          It means Google Analytics will perform data collection from this website and, based on your consent given through <a href="https://support.google.com/analytics/answer/9976101">Google Consent Mode</a>, will use <a href="https://developers.google.com/analytics/devguides/collection/analyticsjs/cookie-usage#gtagjs_and_analyticsjs_universal_analytics_-_cookie_usage">cookies</a> in order to count the number of users who see this page.
          <br>
          <mwc-list multi>
            <mwc-check-list-item @click="${ this._ga3CookieConsentChanged }" ?selected=${ this._gcmAnalyticsCookieConsent } disabled>Enable cookie for GA3 (Universal Analytics) data collection</mwc-check-list-item>
            <mwc-check-list-item @click="${ this._ga3ConsentChanged }">Enable GA3 (Universal Analytics) data collection</mwc-check-list-item>
          </mwc-list>
          <mwc-button @click="${ this._ga3SendEvent }" raised label="Send GA3 Data Collection (event)"></mwc-button>
        </p>
      </section>
      <section>
        <h3>Google Analytics 4 (formerly known as “App + Web”)</h3>
        <p>
          Provide your consent to let this page use <a href="https://developers.google.com/analytics/devguides/collection/ga4">Google Analytics 4 (formerly known as “App + Web”)</a>. It means Google Analytics will perform data collection from this website and will use <a href="https://developers.google.com/analytics/devguides/collection/analyticsjs/cookie-usage#gtagjs_google_analytics_4_-_cookie_usage">cookies</a> in order to count the number of users who see this page.
          <br>
          This consent is required by the differents data privacy regulations (laws) like <a href="https://eur-lex.europa.eu/eli/reg/2016/679/oj"> General Data Privacy Regulation (known as GDPR)</a>, <a href="https://leginfo.legislature.ca.gov/faces/billTextClient.xhtml?bill_id=201720180SB1121">California Consumer Privacy Act (known as CCPA)</a> or <a href="https://www.serpro.gov.br/lgpd/menu/a-lgpd/o-que-muda-com-a-lgpd">Lei Geral de Proteção de Dados Pessoais(known as LGPD)</a>.
          <br>
          It means Google Analytics will perform data collection from this website and, based on your consent given through <a href="https://support.google.com/analytics/answer/9976101">Google Consent Mode</a>, will use <a href="https://developers.google.com/analytics/devguides/collection/analyticsjs/cookie-usage#gtagjs_and_analyticsjs_universal_analytics_-_cookie_usage">cookies</a> in order to count the number of users who see this page.
          <br>
          <mwc-list multi>
            <mwc-check-list-item @click="${ this._ga4CookieConsentChanged }" ?selected=${ this._gcmAnalyticsCookieConsent } disabled>Enable cookie for GA4 data collection</mwc-check-list-item>
            <mwc-check-list-item @click="${ this._ga4ConsentChanged }">Enable GA4 data collection</mwc-check-list-item>
          </mwc-list>
          <mwc-button @click="${ this._ga4SendEvent }" raised label="Send GA4 Data Collection (event)"></mwc-button>
        </p>
      </section>
    `;
  }

  constructor() {
    super();
    this._GA3_MEASUREMENT_ID = "UA-214312451-1";
    this._GA4_MEASUREMENT_ID = "G-VB8XTZC7XR";
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { dataLayer.push(arguments); }
    this._consent = {
      'ad_storage': 'denied',
      'analytics_storage': 'denied',
    }
    gtag('consent', 'default', this._consent);
    gtag('set', { 'restricted_data_processing': true });
    gtag('set', 'allow_google_signals', false);
    gtag('set', 'allow_ad_personalization_signals', false );
    gtag('set', 'url_passthrough', false);
    gtag('set', 'ads_data_redaction', false);
  }

  _gcmAnalyticsCookiesConsentChanged(){
    this._gcmAnalyticsCookieConsent = !this._gcmAnalyticsCookieConsent

    // Change variables value based on the Analytics Cookies Consent
    let analytics_storage
    let dataLayerEvent
    if(this._gcmAnalyticsCookieConsent){
      dataLayerEvent = "analytics_storage_granted"
      analytics_storage = 'granted'
    } else {
      dataLayerEvent = "analytics_storage_denied"
      analytics_storage = 'denied'
    }

    // Update dataLayer
    window.dataLayer.push({"event": dataLayerEvent})
    this._consent = {
      ...this._consent,
      'analytics_storage': analytics_storage
    }
    gtag('consent', 'update', this._consent);
  }

  _gcmAdCookieConsentChanged(){
    this._gcmAdCookieConsent = !this._gcmAdCookieConsent

    // Change variables value based on the Ads Cookies Consent
    let ad_storage
    let dataLayerEvent
    if(this._gcmAdCookieConsent){
      dataLayerEvent = "ad_storage_granted"
      ad_storage = 'granted'
    } else {
      dataLayerEvent = "ad_storage_denied"
      ad_storage = 'denied'
    }

    // Update dataLayer
    window.dataLayer.push({"event": dataLayerEvent})
    this._consent = {
      ...this._consent,
      'ad_storage': ad_storage,
    }
    gtag('consent', 'update', this._consent);
  }

  _gmcAdsDataProcessingForRemarketingListChanged(){
    this._gmcAdsDataProcessingForRemarketingList = !this._gmcAdsDataProcessingForRemarketingList

    // Change variables value based on the Ads Cookies Consent
    let restricted_data_processing = !this._gmcAdsDataProcessingForRemarketingList
    let dataLayerEvent
    if(this._gmcAdsDataProcessingForRemarketingList){
      // full data processing enabled
      dataLayerEvent = "restricted_data_processing_denied"
    } else {
      // full data processing disabled
      dataLayerEvent = "restricted_data_processing_granted"
    }

    // Update dataLayer
    window.dataLayer.push({"event": dataLayerEvent})
    gtag ('set', { 'restricted_data_processing': restricted_data_processing });
  }

  _gcmAdClickDataUrlPassthroughConsentChanged(){
    this._gcmAdClickDataUrlPassthroughConsent = !this._gcmAdClickDataUrlPassthroughConsent

    // Change variables value based on the Ad Click Data Url Passthrough Consent
    let url_passthrough = this._gcmAdClickDataUrlPassthroughConsent
    let dataLayerEvent
    if(this._gcmAdClickDataUrlPassthroughConsent){
      dataLayerEvent = "url_passthrough_granted"
    } else {
      dataLayerEvent = "url_passthrough_denied"
    }

    // Update dataLayer
    window.dataLayer.push({"event": dataLayerEvent})
    gtag('set', 'url_passthrough', url_passthrough);
  }

  _gcmAdDataRedactionConsentChanged(){
    this._gcmAdDataRedactionConsent = !this._gcmAdDataRedactionConsent

    // Change variables value based on the Ad Data Redaction Consent
    let ads_data_redaction = this._gcmAdDataRedactionConsent
    let dataLayerEvent
    if(this._gcmAdDataRedactionConsent){
      dataLayerEvent = "ads_data_redaction_granted"
    } else {
      dataLayerEvent = "ads_data_redaction_denied"
    }

    // Update dataLayer
    window.dataLayer.push({"event": dataLayerEvent})
    gtag('set', 'ads_data_redaction', ads_data_redaction);
  }

  _gcmGoogleSignalsConsentChanged(){
    this._gcmGoogleSignalsConsent = !this._gcmGoogleSignalsConsent

    // Change variables value based on the Ad Data Redaction Consent
    let allow_google_signals = this._gcmGoogleSignalsConsent
    let dataLayerEvent
    if(this._gcmGoogleSignalsConsent){
      dataLayerEvent = "allow_google_signals_granted"
    } else {
      dataLayerEvent = "allow_google_signals_denied"
    }

    // Update dataLayer
    window.dataLayer.push({"event": dataLayerEvent})
    gtag('set', 'allow_google_signals', allow_google_signals);
  }

  async _gtag(GA_MEASUREMENT_ID){
    if(this._gtagExecuted){
      // console.log("gtag already executed")
      return
    } else {
      // script to load gtag
      let f = document.getElementsByTagName("script")[0];
      let gtagScript = document.createElement("script");
      gtagScript.async = true;
      gtagScript.src = "//www.googletagmanager.com/gtag/js?id=" + GA_MEASUREMENT_ID;
      f.parentNode.insertBefore(gtagScript,f);
      let gtagLoaded = new Promise((resolve)=>{
        gtagScript.addEventListener("load",() => {
          // console.log("gtagScript loaded")
          resolve()
        })
      })
  
      // update properties to avoid multiple script loading
      this._gtagExecuted = true;
  
      // Init gtag
      window.dataLayer = window.dataLayer || [];
      window.gtag = function () { dataLayer.push(arguments); }
      gtag('js', new Date());
  
      return gtagLoaded
    }
  }

  _ga3CookieConsentChanged(e) {
    this._ga3CookieConsent = !this._ga3CookieConsent
    if(this._ga3CookieConsent){
      window.dataLayer.push({"event": "ga3ConsentGranted"})
    } else {
      window.dataLayer.push({"event": "ga3ConsentDenied"})
    }
  }

  _ga3ConsentChanged(e) {
    this._ga3Consent = !this._ga3Consent
    if(this._ga3Consent){
      window.dataLayer.push({"event": "ga3ConsentGranted"})
      this._gtag(this._GA3_MEASUREMENT_ID).then(()=>{
        this._ga3()
      })
    }else{
      if(typeof(this._ga3Consent) == "undefined"){
        window.dataLayer.push({"event": "ga3ConsentIndeterminate"})
      }else{
        window.dataLayer.push({"event": "ga3ConsentDenied"})
      }
    }
  }

  _ga3(){
    if(!this._ga3Executed){
      gtag('config', this._GA3_MEASUREMENT_ID, {
        'anonymize_ip': true,
      });
    }
    this._ga3Executed = true;
  }

  _ga3SendEvent(){
    gtag('event', "Send GA3 Event", {
      'event_category': "Test",
      'event_label': "Send GA3 Event",
      'value': 0,
      'send_to': this._GA3_MEASUREMENT_ID,
      'non_interaction': false
    });
  }

  _ga4CookieConsentChanged(e) {
    this._ga4CookieConsent = !this._ga4CookieConsent
    if(this._ga4CookieConsent){
      window.dataLayer.push({"event": "ga4ConsentGranted"})
    } else {
      window.dataLayer.push({"event": "ga4ConsentDenied"})
    }
  }

  _ga4ConsentChanged(e) {
    this._ga4Consent = !this._ga4Consent
    if(this._ga4Consent){
      window.dataLayer.push({"event": "ga4ConsentGranted"})
      this._gtag(this._GA4_MEASUREMENT_ID).then(()=>{
        this._ga4()
      })
    }else{
      if(typeof(this._ga4Consent) == "undefined"){
        window.dataLayer.push({"event": "ga4ConsentIndeterminate"})
      }else{
        window.dataLayer.push({"event": "ga4ConsentDenied"})
      }
    }
  }

  _ga4(){
    if(!this._ga4Executed){
      gtag('config', this._GA4_MEASUREMENT_ID, {
        'anonymize_ip': true,
      });
    }
    this._ga4Executed = true;
  }

  _ga4SendEvent(){
    gtag('event', "Send GA4 Event", {
      'event_category': "Test",
      'event_label': "Send GA4 Event",
      'value': 0,
      'send_to': this._GA4_MEASUREMENT_ID,
      'non_interaction': false
    });
    gtag('event', 'exception', {
      'description': 'error_description',
      'fatal': false,
      'send_to': this._GA4_MEASUREMENT_ID,
    });
  }
}

window.customElements.define('my-view1', MyView1);
