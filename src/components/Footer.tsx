"use client"

import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import FacebookIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/X";
import { joinWaitlist } from "@/app/actions";

// const logoStyle = {
//   width: "140px",
//   height: "auto",
// };

// function Copyright() {
//   return (
//     <Typography variant="body2" color="text.secondary" mt={1}>
//       {"Copyright © "}
//       <Link href="https://mui.com/">Sitemark&nbsp;</Link>
//       {new Date().getFullYear()}
//     </Typography>
//   );
// }

export default function Footer() {

  const [email, setEmail] = React.useState("");

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    try {
      await joinWaitlist(email);
      alert("You have successfully joined the waitlist!");
      setEmail("");
    } catch (error) {
      console.error("Error joining waitlist:", error);
      alert("An error occurred while joining the waitlist");
    }
  }

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: { xs: 4, sm: 8 },
        pt: { xs: 8, sm: 10 },
        textAlign: { sm: "center", md: "left" },
        maxWidth: 'xl'
      }}
      maxWidth={false}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 4,
            minWidth: { xs: "100%", sm: "60%" },
          }}
        >
          <Box sx={{ width: { xs: "100%", sm: "60%" } }}>
              <Image
                width={40}
                height={40}
                alt={"AI Flashcards"}
                src={"/icons/star.png"}
              />
            <Typography variant="body2" fontWeight={600} gutterBottom>
              Waitlist
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={2}>
              Join our waitlist for beta access and updates.
            </Typography>
            <Stack direction="row" spacing={1} useFlexGap>
              <TextField
                id="outlined-basic"
                hiddenLabel
                size="small"
                variant="outlined"
                fullWidth
                aria-label="Enter your email address"
                placeholder="Your email address"
                inputProps={{
                  autoComplete: "off",
                  "aria-label": "Enter your email address",
                }}
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
              <Button
                variant="contained"
                color="primary"
                sx={{ flexShrink: 0 }}
                onClick={handleSubmit}
              >
                Subscribe
              </Button>
            </Stack>
          </Box>
        </Box>
        <Box
          sx={{
            display: { xs: "none", sm: "flex" },
            flexDirection: "column",
            gap: 1,
          }}
        >
          <Typography variant="body2" fontWeight={600}>
            Product
          </Typography>
          {/* <Link color="text.secondary" href="#">
            Features
          </Link>
          <Link color="text.secondary" href="#">
            Testimonials
          </Link>
          <Link color="text.secondary" href="#">
            Highlights
          </Link> */}
          <Link color="text.secondary" href="/#pricing">
            Pricing
          </Link>
          {/* <Link color="text.secondary" href="#">
            FAQs
          </Link> */}
        </Box>
        <Box
          sx={{
            display: { xs: "none", sm: "flex" },
            flexDirection: "column",
            gap: 1,
          }}
        >
          {/* <Typography variant="body2" fontWeight={600}>
            Company
          </Typography>
          <Link color="text.secondary" href="#">
            About us
          </Link> */}
          {/* <Link color="text.secondary" href="#">
            Careers
          </Link>
          <Link color="text.secondary" href="#">
            Press
          </Link> */}
        </Box>
        <Box
          sx={{
            display: { xs: "none", sm: "flex" },
            flexDirection: "column",
            gap: 1,
          }}
        >
          <Typography variant="body2" fontWeight={600}>
            Legal
          </Typography>
          {/* <Link color="text.secondary" href="#">
            Terms
          </Link>
          <Link color="text.secondary" href="#">
            Privacy
          </Link> */}
          <Link color="text.secondary" href="mailto:zhu.kevin12@gmail.com">
            Contact
          </Link>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          pt: { xs: 4, sm: 8 },
          width: "100%",
          borderTop: "1px solid",
          borderColor: "divider",
        }}
      >
        <div>
          <Link color="text.secondary" href="#">
            Privacy Policy
          </Link>
          <Typography display="inline" sx={{ mx: 0.5, opacity: 0.5 }}>
            &nbsp;•&nbsp;
          </Typography>
          <Link color="text.secondary" href="#">
            Terms of Service
          </Link>
          {/* <Copyright /> */}
        </div>
        <Stack
          direction="row"
          justifyContent="left"
          spacing={1}
          useFlexGap
          sx={{
            color: "text.secondary",
          }}
        >
          <IconButton
            color="inherit"
            href="https://github.com/kenyounot123/ai-flashcard"
            aria-label="GitHub"
            sx={{ alignSelf: "center" }}
          >
            <FacebookIcon />
          </IconButton>
          {/* <IconButton
            color="inherit"
            href="https://x.com/MaterialUI"
            aria-label="X"
            sx={{ alignSelf: "center" }}
          >
            <TwitterIcon />
          </IconButton>
          <IconButton
            color="inherit"
            href="https://www.linkedin.com/company/mui/"
            aria-label="LinkedIn"
            sx={{ alignSelf: "center" }}
          >
            <LinkedInIcon />
          </IconButton> */}
        </Stack>
      </Box>
    </Container>
  );
}
