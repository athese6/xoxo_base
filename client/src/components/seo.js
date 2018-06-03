import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import {connect} from "react-redux";

@connect(store => ({
    lang: store.i18n.translations,
}))

export default class SEO extends React.Component {
    render() {
        const {lang, title, description, keywords, path, image} = this.props;
        return (
            <Helmet encodeSpecialCharacters={true}
                /*onChangeClientState={(newState, addedTags, removedTags) => console.log(newState, addedTags, removedTags)}*/>
                {/*<html lang={process.REACT_APP_FACEBOOK_DEFAULT_LOCALE} amp/>*/}
                {
                    (title || lang["tag_default_title"]) &&
                    <title>{title || lang["tag_default_title"]}</title>
                }
                {
                    process.REACT_APP_BASE_URL &&
                    <link rel="canonical" href={process.REACT_APP_BASE_URL + path}/>
                }
                {
                    (description || lang["tag_default_description"]) &&
                    <meta name="description" content={description || lang["tag_default_description"]}/>
                }
                {
                    (keywords || lang["tag_default_keywords"]) &&
                    <meta name="keywords" content={keywords || lang["tag_default_keywords"]}/>
                }
                {
                    lang["tag_default_author"] &&
                    <meta name="author" content={lang["tag_default_author"]}/>
                }
                {
                    (title || lang["tag_default_title"]) &&
                    <meta property="og:title" content={title || lang["tag_default_title"]}/>
                }
                {
                    lang["tag_default_site_name"] &&
                    <meta property="og:site_name" content={lang["tag_default_site_name"]}/>
                }
                <meta property="og:type" content={"website"}/>
                {
                    process.REACT_APP_BASE_URL &&
                    <meta property="og:url" content={process.REACT_APP_BASE_URL + path}/>
                }
                {
                    (image || lang["tag_default_image"]) &&
                    <meta property="og:image" content={image || lang["tag_default_image"]}/>
                }
                {
                    (description || lang["tag_default_description"]) &&
                    <meta property="og:description" content={description || lang["tag_default_description"]}/>
                }
                {
                    (lang["tag_default_og_locale"] || process.REACT_APP_FACEBOOK_DEFAULT_LOCALE) &&
                    <meta property="og:locale"
                          content={lang["tag_default_og_locale"] || process.REACT_APP_FACEBOOK_DEFAULT_LOCALE}/>
                }
            </Helmet>
        );
    }
}

SEO.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    keywords: PropTypes.string,
    path: PropTypes.string,
    image: PropTypes.string,

};

SEO.defaultProps = {
    title: undefined,
    description: undefined,
    keywords: undefined,
    path: undefined,
    image: undefined,
};


/*inline script elements
<script type="application/ld+json">{`
{
"@context": "http://schema.org"
}
`}</script>
*/

/* noscript elements
<noscript>{`
<link rel="stylesheet" type="text/css" href="foo.css" />
`}</noscript>
*/
