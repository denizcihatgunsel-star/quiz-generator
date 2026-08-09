package com.examina.ink;

import android.os.Bundle;
import android.webkit.WebSettings;
import android.webkit.WebView;

import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        // Pin a mobile user agent so the site always serves the mobile version.
        WebView webView = getBridge().getWebView();
        String mobileUa = WebSettings.getDefaultUserAgent(this)
                + " Mobile ExaminaApp/1.0";
        webView.getSettings().setUserAgentString(mobileUa);
    }
}
