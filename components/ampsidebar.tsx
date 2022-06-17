import React from 'react';
import { useAmp } from 'next/amp';
import AmpFab from '../components/ampfab';
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import NavigationIcon from "@material-ui/icons/Navigation";

export const config = { amp: true };


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fab: {
      display: "block",
      [theme.breakpoints.up("sm")]: {
        display: "none",
      },
      margin: 0,
      top: "auto",
      right: 20,
      bottom: 20,
      left: "auto",
      position: "fixed",
    },
  })
);

const AmpSidebar = ({ children }) => {
  const classes = useStyles();
  return (
  useAmp() ? (
    
    <>
      <AmpFab
        on="tap:ampsidebar.toggle"
        variant="extended"
        aria-label="amp-fab"
        className={classes.fab}
      >
        <NavigationIcon>Navigation</NavigationIcon>
        <div>パラメータ設定</div>
      </AmpFab>
        <amp-sidebar id="ampsidebar" className="ampsidebar" layout="nodisplay">{children}</amp-sidebar>      
    </>
  ) : (
    <> 
     
    </>
  )
  )
  };


AmpSidebar.defaultProps = {
    children: <>
      <ul>
      <li>Nav item 1</li>
      <li><a href="#idTwo" on="tap:idTwo.scrollTo">Nav item 2</a></li>
      <li>Nav item 3</li>
      <li><a href="#idFour" on="tap:idFour.scrollTo">Nav item 4</a></li>
      <li>Nav item 5</li>
      <li>Nav item 6</li>
    </ul>
      <button class="hamburger" on='tap:sidebar1.toggle'>反映</button>
    </>,
  };


export default AmpSidebar;