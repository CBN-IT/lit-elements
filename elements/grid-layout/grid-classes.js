"use strict";
import {css} from 'lit'

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

export const gridFlexClasses = css`
  .col-xl-flex-1, .col-xl-flex-10, .col-xl-flex-11, .col-xl-flex-12, .col-xl-flex-2, .col-xl-flex-3, .col-xl-flex-4, .col-xl-flex-5, .col-xl-flex-7, .col-xl-flex-6, .col-xl-flex-8, .col-xl-flex-9,
  .col-lg-flex-1, .col-lg-flex-10, .col-lg-flex-11, .col-lg-flex-12, .col-lg-flex-2, .col-lg-flex-3, .col-lg-flex-4, .col-lg-flex-5, .col-lg-flex-7, .col-lg-flex-6, .col-lg-flex-8, .col-lg-flex-9,
  .col-md-flex-1, .col-md-flex-10, .col-md-flex-11, .col-md-flex-12, .col-md-flex-2, .col-md-flex-3, .col-md-flex-4, .col-md-flex-5, .col-md-flex-7, .col-md-flex-6, .col-md-flex-8, .col-md-flex-9,
  .col-sm-flex-1, .col-sm-flex-10, .col-sm-flex-11, .col-sm-flex-12, .col-sm-flex-2, .col-sm-flex-3, .col-sm-flex-4, .col-sm-flex-5, .col-sm-flex-7, .col-sm-flex-6, .col-sm-flex-8, .col-sm-flex-9,
  .col-xs-flex-1, .col-xs-flex-10, .col-xs-flex-11, .col-xs-flex-12, .col-xs-flex-2, .col-xs-flex-3, .col-xs-flex-4, .col-xs-flex-5, .col-xs-flex-7, .col-xs-flex-6, .col-xs-flex-8, .col-xs-flex-9 {
    box-sizing: border-box;
  }

  /*<editor-fold desc="Extra Small Screen .col-xs-">*/

  .col-xs-flex-12 {
    flex: 12;
    min-width: 100%;
  }

  .col-xs-flex-11 {
    flex: 11;
    min-width: 91.66666667%;
  }

  .col-xs-flex-10 {
    flex: 10;
    min-width: 83.33333333%;
  }

  .col-xs-flex-9 {
    flex: 9;
    min-width: 75%;
  }

  .col-xs-flex-8 {
    flex: 8;
    min-width: 66.66666667%;
  }

  .col-xs-flex-7 {
    flex: 7;
    min-width: 58.33333333%;
  }

  .col-xs-flex-6 {
    flex: 6;
    min-width: 50%;
  }

  .col-xs-flex-5 {
    flex: 5;
    min-width: 41.66666667%;
  }

  .col-xs-flex-4 {
    flex: 4;
    min-width: 33.33333333%;
  }

  .col-xs-flex-3 {
    flex: 3;
    min-width: 25%;
  }

  .col-xs-flex-2 {
    flex: 2;
    min-width: 16.66666667%;
  }

  .col-xs-flex-1 {
    flex: 1;
    min-width: 8.33333333%;
  }

  /*</editor-fold>*/

  /*<editor-fold desc="Small Screen .col-sm- min-width: 768px">*/
  @media (min-width: 768px) {
    .col-sm-flex-12 {
      flex: 12;
      min-width: 100%;
    }

    .col-sm-flex-11 {
      flex: 11;
      min-width: 91.66666667%;
    }

    .col-sm-flex-10 {
      flex: 10;
      min-width: 83.33333333%;
    }

    .col-sm-flex-9 {
      flex: 9;
      min-width: 75%;
    }

    .col-sm-flex-8 {
      flex: 8;
      min-width: 66.66666667%;
    }

    .col-sm-flex-7 {
      flex: 7;
      min-width: 58.33333333%;
    }

    .col-sm-flex-6 {
      flex: 6;
      min-width: 50%;
    }

    .col-sm-flex-5 {
      flex: 5;
      min-width: 41.66666667%;
    }

    .col-sm-flex-4 {
      flex: 4;
      min-width: 33.33333333%;
    }

    .col-sm-flex-3 {
      flex: 3;
      min-width: 25%;
    }

    .col-sm-flex-2 {
      flex: 2;
      min-width: 16.66666667%;
    }

    .col-sm-flex-1 {
      flex: 1;
      min-width: 8.33333333%;
    }
  }

  /*</editor-fold>*/

  /*<editor-fold desc="Medium Screen .col-md- min-width: 992px">*/
  @media (min-width: 992px) {
    .col-md-flex-12 {
      flex: 12;
      min-width: 100%;
    }

    .col-md-flex-11 {
      flex: 11;
      min-width: 91.66666667%;
    }

    .col-md-flex-10 {
      flex: 10;
      min-width: 83.33333333%;
    }

    .col-md-flex-9 {
      flex: 9;
      min-width: 75%;
    }

    .col-md-flex-8 {
      flex: 8;
      min-width: 66.66666667%;
    }

    .col-md-flex-7 {
      flex: 7;
      min-width: 58.33333333%;
    }

    .col-md-flex-6 {
      flex: 6;
      min-width: 50%;
    }

    .col-md-flex-5 {
      flex: 5;
      min-width: 41.66666667%;
    }

    .col-md-flex-4 {
      flex: 4;
      min-width: 33.33333333%;
    }

    .col-md-flex-3 {
      flex: 3;
      min-width: 25%;
    }

    .col-md-flex-2 {
      flex: 2;
      min-width: 16.66666667%;
    }

    .col-md-flex-1 {
      flex: 1;
      min-width: 8.33333333%;
    }
  }

  /*</editor-fold>*/

  /*<editor-fold desc="Large Screen .col-lg- min-width: 1200px">*/
  @media (min-width: 1200px) {
    .col-lg-flex-12 {
      flex: 12;
      min-width: 100%;
    }

    .col-lg-flex-11 {
      flex: 11;
      min-width: 91.66666667%;
    }

    .col-lg-flex-10 {
      flex: 10;
      min-width: 83.33333333%;
    }

    .col-lg-flex-9 {
      flex: 9;
      min-width: 75%;
    }

    .col-lg-flex-8 {
      flex: 8;
      min-width: 66.66666667%;
    }

    .col-lg-flex-7 {
      flex: 7;
      min-width: 58.33333333%;
    }

    .col-lg-flex-6 {
      flex: 6;
      min-width: 50%;
    }

    .col-lg-flex-5 {
      flex: 5;
      min-width: 41.66666667%;
    }

    .col-lg-flex-4 {
      flex: 4;
      min-width: 33.33333333%;
    }

    .col-lg-flex-3 {
      flex: 3;
      min-width: 25%;
    }

    .col-lg-flex-2 {
      flex: 2;
      min-width: 16.66666667%;
    }

    .col-lg-flex-1 {
      flex: 1;
      min-width: 8.33333333%;
    }
  }

  /*</editor-fold>*/

  /*<editor-fold desc="Extra Large Screen .col-xl- min-width: 1600px">*/
  @media (min-width: 1600px) {
    .col-xl-flex-12 {
      flex: 12;
      min-width: 100%;
    }

    .col-xl-flex-11 {
      flex: 11;
      min-width: 91.66666667%;
    }

    .col-xl-flex-10 {
      flex: 10;
      min-width: 83.33333333%;
    }

    .col-xl-flex-9 {
      flex: 9;
      min-width: 75%;
    }

    .col-xl-flex-8 {
      flex: 8;
      min-width: 66.66666667%;
    }

    .col-xl-flex-7 {
      flex: 7;
      min-width: 58.33333333%;
    }

    .col-xl-flex-6 {
      flex: 6;
      min-width: 50%;
    }

    .col-xl-flex-5 {
      flex: 5;
      min-width: 41.66666667%;
    }

    .col-xl-flex-4 {
      flex: 4;
      min-width: 33.33333333%;
    }

    .col-xl-flex-3 {
      flex: 3;
      min-width: 25%;
    }

    .col-xl-flex-2 {
      flex: 2;
      min-width: 16.66666667%;
    }

    .col-xl-flex-1 {
      flex: 1;
      min-width: 8.33333333%;
    }
  }

  /*</editor-fold>*/
`;