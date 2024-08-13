"use client";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import Link from "next/link";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

const landing = ["Product", "Pricing"];
const pages = ["Dashboard", "Generate"];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar
      id="home"
      sx={{ maxWidth: "xl", boxShadow: "none", mx: "auto" }}
      position="static"
      color="secondary"
    >
      <Container maxWidth={false}>
        <Toolbar disableGutters>
          <Link href={"/"} style={{ textDecoration: "none", color: "inherit" }}>
            <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          </Link>
          <Link href={"/"} style={{ textDecoration: "none", color: "inherit" }}>
            <Typography
              variant="h6"
              noWrap
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "primary.main",
                textDecoration: "none",
              }}
            >
              AIFlashPrep
            </Typography>
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="primary"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {landing.map((page) => (
                <Link
                  key={page}
                  style={{ textDecoration: "none" }}
                  href={`/#${page.toLowerCase()}`}
                >
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography
                      color="primary"
                      variant="body2"
                      textAlign="center"
                    >
                      {page}
                    </Typography>
                  </MenuItem>
                </Link>
              ))}
              {pages.map((page) => (
                <Link
                  key={page}
                  style={{ textDecoration: "none" }}
                  href={`/${page.toLowerCase()}`}
                >
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography
                      color="primary"
                      variant="body2"
                      textAlign="center"
                    >
                      {page}
                    </Typography>
                  </MenuItem>
                </Link>
              ))}
            </Menu>
          </Box>
          <Link href={"/"} style={{ textDecoration: "none", color: "inherit" }}>
            <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          </Link>
          <Typography
            variant="h5"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "primary.main",
              textDecoration: "none",
            }}
          >
            <Link href={"/"} style={{ textDecoration: "none", color: "inherit" }}>AIFlashPrep</Link>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {landing.map((page) => (
              <Link
                key={page}
                style={{ textDecoration: "none" }}
                href={`/#${page.toLowerCase()}`}
              >
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "primary.main", display: "block" }}
                >
                  {page}
                </Button>
              </Link>
            ))}
            {pages.map((page) => (
              <Link
                key={page}
                style={{ textDecoration: "none" }}
                href={`/${page.toLowerCase()}`}
              >
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "primary.main", display: "block" }}
                >
                  {page}
                </Button>
              </Link>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <SignedOut>
              <SignInButton>
                <Button variant="outlined">Sign In</Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
