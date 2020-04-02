"use strict";
import {css} from '/node_modules/lit-element/lit-element.js';

// language=CSS
export const gridClasses = css`
    .col-xl-1, .col-xl-10, .col-xl-11, .col-xl-12, .col-xl-2, .col-xl-3, .col-xl-4, .col-xl-5, .col-xl-7, .col-xl-6, .col-xl-8, .col-xl-9,
    .col-lg-1, .col-lg-10, .col-lg-11, .col-lg-12, .col-lg-2, .col-lg-3, .col-lg-4, .col-lg-5, .col-lg-7, .col-lg-6, .col-lg-8, .col-lg-9,
    .col-md-1, .col-md-10, .col-md-11, .col-md-12, .col-md-2, .col-md-3, .col-md-4, .col-md-5, .col-md-7, .col-md-6, .col-md-8, .col-md-9,
    .col-sm-1, .col-sm-10, .col-sm-11, .col-sm-12, .col-sm-2, .col-sm-3, .col-sm-4, .col-sm-5, .col-sm-7, .col-sm-6, .col-sm-8, .col-sm-9,
    .col-xs-1, .col-xs-10, .col-xs-11, .col-xs-12, .col-xs-2, .col-xs-3, .col-xs-4, .col-xs-5, .col-xs-7, .col-xs-6, .col-xs-8, .col-xs-9 {
        box-sizing: border-box;
    }

    /*<editor-fold desc="Extra Small Screen .col-xs-">*/
    .col-xs-12 {
        width: 100%;
    }

    .col-xs-11 {
        width: 91.66666667%;
    }

    .col-xs-10 {
        width: 83.33333333%;
    }

    .col-xs-9 {
        width: 75%;
    }

    .col-xs-8 {
        width: 66.66666667%;
    }

    .col-xs-7 {
        width: 58.33333333%;
    }

    .col-xs-6 {
        width: 50%;
    }

    .col-xs-5 {
        width: 41.66666667%;
    }

    .col-xs-4 {
        width: 33.33333333%;
    }

    .col-xs-3 {
        width: 25%;
    }

    .col-xs-2 {
        width: 16.66666667%;
    }

    .col-xs-1 {
        width: 8.33333333%;
    }

    /*</editor-fold>*/

    /*<editor-fold desc="Small Screen .col-sm- min-width: 768px">*/
    @media (min-width: 768px) {
        .col-sm-12 {
            width: 100%;
        }

        .col-sm-11 {
            width: 91.66666667%;
        }

        .col-sm-10 {
            width: 83.33333333%;
        }

        .col-sm-9 {
            width: 75%;
        }

        .col-sm-8 {
            width: 66.66666667%;
        }

        .col-sm-7 {
            width: 58.33333333%;
        }

        .col-sm-6 {
            width: 50%;
        }

        .col-sm-5 {
            width: 41.66666667%;
        }

        .col-sm-4 {
            width: 33.33333333%;
        }

        .col-sm-3 {
            width: 25%;
        }

        .col-sm-2 {
            width: 16.66666667%;
        }

        .col-sm-1 {
            width: 8.33333333%;
        }
    }

    /*</editor-fold>*/

    /*<editor-fold desc="Medium Screen .col-md- min-width: 992px">*/
    @media (min-width: 992px) {
        .col-md-12 {
            width: 100%;
        }

        .col-md-11 {
            width: 91.66666667%;
        }

        .col-md-10 {
            width: 83.33333333%;
        }

        .col-md-9 {
            width: 75%;
        }

        .col-md-8 {
            width: 66.66666667%;
        }

        .col-md-7 {
            width: 58.33333333%;
        }

        .col-md-6 {
            width: 50%;
        }

        .col-md-5 {
            width: 41.66666667%;
        }

        .col-md-4 {
            width: 33.33333333%;
        }

        .col-md-3 {
            width: 25%;
        }

        .col-md-2 {
            width: 16.66666667%;
        }

        .col-md-1 {
            width: 8.33333333%;
        }
    }

    /*</editor-fold>*/

    /*<editor-fold desc="Large Screen .col-lg- min-width: 1200px">*/
    @media (min-width: 1200px) {
        .col-lg-12 {
            width: 100%;
        }

        .col-lg-11 {
            width: 91.66666667%;
        }

        .col-lg-10 {
            width: 83.33333333%;
        }

        .col-lg-9 {
            width: 75%;
        }

        .col-lg-8 {
            width: 66.66666667%;
        }

        .col-lg-7 {
            width: 58.33333333%;
        }

        .col-lg-6 {
            width: 50%;
        }

        .col-lg-5 {
            width: 41.66666667%;
        }

        .col-lg-4 {
            width: 33.33333333%;
        }

        .col-lg-3 {
            width: 25%;
        }

        .col-lg-2 {
            width: 16.66666667%;
        }

        .col-lg-1 {
            width: 8.33333333%;
        }
    }

    /*</editor-fold>*/

    /*<editor-fold desc="Extra Large Screen .col-xl- min-width: 1600px">*/
    @media (min-width: 1600px) {
        .col-xl-12 {
            width: 100%;
        }

        .col-xl-11 {
            width: 91.66666667%;
        }

        .col-xl-10 {
            width: 83.33333333%;
        }

        .col-xl-9 {
            width: 75%;
        }

        .col-xl-8 {
            width: 66.66666667%;
        }

        .col-xl-7 {
            width: 58.33333333%;
        }

        .col-xl-6 {
            width: 50%;
        }

        .col-xl-5 {
            width: 41.66666667%;
        }

        .col-xl-4 {
            width: 33.33333333%;
        }

        .col-xl-3 {
            width: 25%;
        }

        .col-xl-2 {
            width: 16.66666667%;
        }

        .col-xl-1 {
            width: 8.33333333%;
        }
    }

    /*</editor-fold>*/
`;