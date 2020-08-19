import React, { useState } from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";

// @material-ui/icons
import DevicesOther from '@material-ui/icons/DevicesOther';
import ThumbUp from '@material-ui/icons/ThumbUp';
import Link from "@material-ui/icons/Link";
import Language from "@material-ui/icons/Language";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import InfoArea from "components/InfoArea/InfoArea.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";

import styles from "assets/jss/material-dashboard-pro-react/views/registerPageStyle";

const useStyles = makeStyles(styles);

export default function RegisterPage() {
  
  var originUrlHandler = (event) => {
    setOriginUrl(event.target.value);
  }

  var onClickGetUrl = (event) => {
    fetch(`https://us-central1-shorturl-7959.cloudfunctions.net/getShortUrl?originUrl=${originUrl}`)
    .then( r => r.json())
    .then( data => {
      console.log(data);
      setShortUrl(data.data.shortUrl);
    })
    .catch( err => console.log(err));
  }

  const classes = useStyles();
  const [originUrl, setOriginUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  return (
    <div className={classes.container}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={10}>
          <Card className={classes.cardSignup}>
            <h2 className={classes.cardTitle}>Short URL</h2>
            <CardBody>
              <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={5}>
                  <form className={classes.form}>
                    <CustomInput
                      formControlProps={{
                        fullWidth: true,
                        className: classes.customFormControlClasses
                      }}
                      inputProps={{
                        value: originUrl,
                        onChange: originUrlHandler,
                        startAdornment: (
                          <InputAdornment
                            position="start"
                            className={classes.inputAdornment}
                          >
                            <Language className={classes.inputAdornmentIcon} />
                          </InputAdornment>
                        ),
                        placeholder: "Text URL Here"
                      }}
                    />
                    <CustomInput
                      formControlProps={{
                        fullWidth: true,
                        className: classes.customFormControlClasses
                      }}
                      inputProps={{
                        onClick: ()=>{alert("Copied! " + shortUrl)},
                        value: shortUrl,
                        disabled: true,
                        startAdornment: (
                          <InputAdornment
                            position="start"
                            className={classes.inputAdornment}
                          >
                            <Link className={classes.inputAdornmentIcon} />
                          </InputAdornment>
                        ),
                        placeholder: "short url..."
                      }}
                    />
                    <div className={classes.center}>
                      <Button round color="rose" onClick={onClickGetUrl}>
                        Get URL
                      </Button>
                    </div>
                  </form>
                  <InfoArea
                    title="Shortened"
                    description="Use any link, no matter what size, ShortURL always shortens"
                    icon={Link}
                    iconColor="rose"
                  />
                  <InfoArea
                    title="Easy"
                    description="ShortURL is easy and fast, enter the long link to get your shortened link"
                    icon={ThumbUp}
                    iconColor="success"
                  />
                  <InfoArea
                    title="Devices"
                    description="Compatible with smartphones, tablets and desktop"
                    icon={DevicesOther}
                    iconColor="info"
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
