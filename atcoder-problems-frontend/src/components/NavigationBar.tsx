import React, { useState } from "react";
import { NavLink as RouterLink, Route } from "react-router-dom";
import {
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  NavItem,
  NavLink,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  UncontrolledDropdown,
} from "reactstrap";
import { useLoginState } from "../api/InternalAPIClient";
import { useLoginLink } from "../utils/Url";
import { ACCOUNT_INFO } from "../utils/RouterPath";
import * as UserState from "../utils/UserState";
import { ThemeSelector } from "./ThemeSelector";
import { UserSearchBar } from "./UserSearchBar";

export const NavigationBar = () => {
  const loginState = useLoginState().data;
  const isLoggedIn = UserState.isLoggedIn(loginState);
  const loggedInUserId = UserState.loggedInUserId(loginState) ?? "";
  const loginLink = useLoginLink();

  const [isOpen, setIsOpen] = React.useState(false);

  const [isNavigationFixed, setIsNavigationFixed] = useState(true);

  return (
    <div className={isNavigationFixed ? "sticky-top" : ""}>
      <Navbar color="dark" dark expand="lg">
        <NavbarBrand tag={RouterLink} to="/" className="mb-0 h1">
          AtCoder Problems
        </NavbarBrand>

        <NavbarToggler onClick={(): void => setIsOpen(!isOpen)} />

        <Collapse isOpen={isOpen} navbar>
          <Nav navbar>
            <NavItem>
              <NavLink tag={RouterLink} to="/table/">
                Problems
              </NavLink>
            </NavItem>

            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Rankings
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem tag={RouterLink} to="/ac">
                  AC Count
                </DropdownItem>
                <DropdownItem tag={RouterLink} to="/fast">
                  Fastest Submissions
                </DropdownItem>
                <DropdownItem tag={RouterLink} to="/short">
                  Shortest Submissions
                </DropdownItem>
                <DropdownItem tag={RouterLink} to="/first">
                  First AC
                </DropdownItem>
                <DropdownItem tag={RouterLink} to="/sum">
                  Rated Point Ranking
                </DropdownItem>
                <DropdownItem tag={RouterLink} to="/streak">
                  Streak Ranking
                </DropdownItem>
                <DropdownItem tag={RouterLink} to="/lang">
                  Language Owners
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>

            <NavItem>
              <NavLink tag={RouterLink} to="/submissions/recent">
                Submissions
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink
                href="https://github.com/kenkoooo/AtCoderProblems/tree/master/doc"
                target="_blank"
                rel="noopener noreferrer"
              >
                FAQ
              </NavLink>
            </NavItem>

            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Links
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem
                  tag="a"
                  href="https://atcoder.jp/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  AtCoder
                </DropdownItem>
                <DropdownItem
                  tag="a"
                  href="http://aoj-icpc.ichyo.jp/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  AOJ-ICPC
                </DropdownItem>
                <DropdownItem
                  tag="a"
                  href="https://github.com/kenkoooo/AtCoderProblems"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </DropdownItem>
                <DropdownItem
                  tag="a"
                  href="https://twitter.com/kenkoooo"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  @kenkoooo
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>

            <NavItem>
              <NavLink
                href="https://github.com/sponsors/kenkoooo"
                target="_blank"
                rel="noopener noreferrer"
              >
                Send a tip
              </NavLink>
            </NavItem>
          </Nav>

          <Nav className="ml-auto" navbar>
            <ThemeSelector />

            <NavItem>
              <NavLink tag={RouterLink} to="/contest/recent">
                Virtual Contests
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink tag={RouterLink} to="/training">
                Training
              </NavLink>
            </NavItem>

            <NavItem>
              {isLoggedIn ? (
                <NavLink tag={RouterLink} to={ACCOUNT_INFO}>
                  Account ({loggedInUserId})
                </NavLink>
              ) : (
                <NavLink href={loginLink}>Login</NavLink>
              )}
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>

      <Route
        path={[
          "/user/:userIds([a-zA-Z0-9_]+)+",
          "/table/:userIds([a-zA-Z0-9_]*)*",
          "/list/:userIds([a-zA-Z0-9_]*)*",
        ]}
      >
        <UserSearchBar
          isNavigationFixed={isNavigationFixed}
          setIsNavigationFixed={() => setIsNavigationFixed((e) => !e)}
        />
      </Route>
    </div>
  );
};
