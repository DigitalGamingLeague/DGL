import React from 'react';
import { Navbar, Nav, NavItem, Popover, OverlayTrigger } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import FontAwesome from 'react-fontawesome';

const constructionWarning = (
    <Popover className="construction-warning" title="Under Construction">
        Sorry, this is disabled while the site is under construction. 
    </Popover>
);

const Navigation = () => ( 
    <Navbar fluid id="navigation" fixedTop>
        <Navbar.Header>
            <Navbar.Brand>
                <LinkContainer to="/">
                    <img id="logo" src="/images/logo.png" />
                </LinkContainer >   
            </Navbar.Brand>
            <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
            <GlobalNavigation />
            <MediaNavigation />
        </Navbar.Collapse>
    </Navbar>
);
                                     
const GlobalNavigation = () => (
    <Nav>
                                     
        <LinkContainer to="/">
            <NavItem eventKey={2}>
                Home 
            </NavItem>
        </LinkContainer>

        <OverlayTrigger placement="bottom" overlay={constructionWarning}>
            <LinkContainer to="events">
                <NavItem eventKey={3}>
                    Events
                </NavItem>
            </LinkContainer>
        </OverlayTrigger>

        <LinkContainer to="rules">
            <NavItem eventKey={4}>
                Rules
            </NavItem>
        </LinkContainer>

        <OverlayTrigger placement="bottom" overlay={constructionWarning}>
            <LinkContainer to="members">
                <NavItem eventKey={5}>
                    Members
                </NavItem>
            </LinkContainer>
        </OverlayTrigger>
    
        <OverlayTrigger placement="bottom" overlay={constructionWarning}>
            <LinkContainer to="teams">
                <NavItem eventKey={6}>
                    Teams
                </NavItem>
            </LinkContainer> 
        </OverlayTrigger>
    </Nav>                                    
);


                                     
const MediaNavigation = () => (
                                     
    <Nav pullRight id="right-nav">
                                    
        <NavItem eventKey={7} href="http://chat.playbcl.com">
            <img id="discord" src="/images/Discord-Logo-BCL.png" />
        </NavItem>     
                                     
        <NavItem eventKey={8} href="https://www.twitch.tv/blacklightcommunity">
            <FontAwesome name='twitch' />
        </NavItem>  
                                     
        <NavItem eventKey={9} href="https://twitter.com/playbcl">
            <FontAwesome name='twitter' />
        </NavItem>
                                     
        <NavItem eventKey={10} href="https://www.youtube.com/channel/UCtnBwqhRIUolsq1WwiRpUJA">
            <FontAwesome name='youtube' />
        </NavItem>

    </Nav>
                                   
);

export default Navigation;