import { BrowserPolicy } from 'meteor/browser-policy-common';
// e.g., BrowserPolicy.content.allowOriginForAll( 's3.amazonaws.com' );
BrowserPolicy.content.allowStyleOrigin('fonts.googleapis.com');
BrowserPolicy.content.allowFontOrigin('fonts.gstatic.com');
