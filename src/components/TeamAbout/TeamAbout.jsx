import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  CircularProgress,
  Grid,
  Typography,
  Divider,
} from "@mui/material";
import { useEffect, useState } from "react";
import HighlightsDrawer from "./components/HighlightsDrawer";
import pathConfig from "../../config/path/pathConfig";

// Import logos
import logo1 from "../../assets/funders-logos/Logo1-UKIERI.png";
import logo2 from "../../assets/funders-logos/Logo2-SPARC2.png";
import logo3 from "../../assets/funders-logos/Logo3-UCL.png";
import logo4 from "../../assets/funders-logos/Logo4-MNIT.png";
import logo5 from "../../assets/funders-logos/Logo5-BritishC.png";
import logo6 from "../../assets/funders-logos/Logo6-MinEdu.png";
import logo7 from "../../assets/funders-logos/Logo7-DSIT.png";

const logoData1 = [
  { img: logo5, url: "https://www.britishcouncil.org//" },
  {
    img: logo7,
    url: "https://www.gov.uk/government/organisations/department-for-science-innovation-and-technology",
  },
  { img: logo6, url: "https://www.education.gov.in/" },
  { img: logo1, url: "http://www.ukieri.org/" },
  { img: logo2, url: "https://sparc.iitkgp.ac.in/" },
];

const logoData2 = [
  { img: logo3, url: "https://www.ucl.ac.uk/" },
  { img: logo4, url: "https://www.mnit.ac.in/" },
];

const TeamAbout = () => {
  const [highlightCards, setHighlightCards] = useState([]);
  const [aboutData, setAboutData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    Promise.all([
      fetch(pathConfig.HIGHLIGHTS_PATH),
      fetch(pathConfig.ABOUT_PATH),
    ])
      .then(async ([highlightsResponse, aboutResponse]) => {
        if (!highlightsResponse.ok || !aboutResponse.ok) {
          throw new Error("No network response for one or more files.");
        }
        const highlightsData = await highlightsResponse.json();
        const aboutData = await aboutResponse.json();
        return [highlightsData, aboutData];
      })
      .then(([highlightsData, aboutData]) => {
        const formattedHighlights = highlightsData.map((item) => ({
          ...item,
          name: item.title,
          image_url: item.image,
        }));
        setHighlightCards(formattedHighlights);
        setAboutData(aboutData);
        setIsLoading(false);
      })
      .catch((fetchError) => {
        console.error("Failed to fetch page data:", fetchError);
        setError("Could not load page content. Please try again later.");
        setIsLoading(false);
      });
  }, []);

  const handleCardClick = (cardData) => {
    setSelectedCard(cardData);
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  return (
    <Box>
      {/* Team */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" sx={{ color: "primary.main", mb: 2 }}>
          Collaborators
        </Typography>

        <Grid container justifyContent="center" alignItems="center">
          {logoData2.map((item, index) => (
            <Grid
              key={index}
              size={{ xs: 6, sm: 3 }}
              display="flex"
              justifyContent="center"
            >
              <Box
                component="a"
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 150,
                  height: 150,
                  transition: "transform 0.2s",
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                }}
              >
                <Box
                  component="img"
                  src={item.img}
                  alt={`Partner logo ${index}`}
                  sx={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "contain",
                  }}
                />
              </Box>
            </Grid>
          ))}
        </Grid>
        <Box sx={{ ml: 2 }}>
          {/* Core Team*/}
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ color: "primary.dark" }}
            >
              Core Development Team
            </Typography>
            <Grid container spacing={2}>
              {aboutData
                .filter((member) => member.type === "core")
                .map((member, index) => (
                  <Grid
                    key={index}
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      my: 2,
                    }}
                    size={{ xs: 12, sm: 6, md: 4 }}
                  >
                    <Avatar
                      alt={member.name}
                      src={member.avatarUrl}
                      sx={{ width: 80, height: 80, mr: 2, boxShadow: 2 }}
                    />
                    <Box>
                      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                        {member.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {member.role}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {member.affiliation}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
            </Grid>
          </Box>
          {/* Support Team*/}
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ color: "primary.dark" }}
            >
              Research and Technical Support Team
            </Typography>
            <Grid container spacing={2}>
              {aboutData
                .filter((member) => member.type === "support")
                .map((member, index) => (
                  <Grid
                    key={index}
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      my: 2,
                    }}
                    size={{ xs: 12, sm: 6, md: 4 }}
                  >
                    <Avatar
                      alt={member.name}
                      src={member.avatarUrl}
                      sx={{ width: 80, height: 80, mr: 2, boxShadow: 2 }}
                    />
                    <Box>
                      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                        {member.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {member.role}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {member.affiliation}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
            </Grid>
          </Box>
          {/* Extended Team*/}
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ color: "primary.dark" }}
            >
              Extended Project Team
            </Typography>
            <Grid container spacing={2}>
              {aboutData
                .filter((member) => member.type === "extended")
                .map((member, index) => (
                  <Grid
                    key={index}
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      my: 2,
                    }}
                    size={{ xs: 12, sm: 6, md: 4 }}
                  >
                    <Avatar
                      alt={member.name}
                      src={member.avatarUrl}
                      sx={{ width: 80, height: 80, mr: 2 }}
                    />
                    <Box>
                      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                        {member.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {member.role}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {member.affiliation}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
            </Grid>
          </Box>
        </Box>
      </Box>
      <Divider sx={{ my: 4 }} />
      {/* Funders*/}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" sx={{ color: "primary.main", mb: 2 }}>
          Funders
        </Typography>
        <Grid container justifyContent="center" alignItems="center">
          {logoData1.map((item, index) => (
            <Grid
              key={index}
              size={{ xs: 4, sm: 2 }}
              display="flex"
              justifyContent="center"
            >
              <Box
                component="a"
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 150,
                  height: 150,
                  transition: "transform 0.2s",
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                }}
              >
                <Box
                  component="img"
                  src={item.img}
                  alt={`Partner logo ${index}`}
                  sx={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "contain",
                  }}
                />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Divider sx={{ my: 4 }} />

      {/* Highlights */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" sx={{ color: "primary.main", mb: 2 }}>
          News & Highlights
        </Typography>
        <Grid>
          {isLoading && (
            <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
              <CircularProgress />
            </Box>
          )}
          {error && (
            <Typography color="error" sx={{ my: 2 }}>
              {error}
            </Typography>
          )}

          <Grid container spacing={2}>
            {!isLoading &&
              !error &&
              highlightCards.map((card) => (
                <Grid size={{ sm: 12, md: 4 }} key={card.name}>
                  <Card
                    sx={{
                      height: "100%",
                      borderRadius: "12px",
                      transition: "transform 0.2s, box-shadow 0.2s",
                      "&:hover": {
                        transform: "scale(1.03)",
                        boxShadow: 6,
                      },
                    }}
                  >
                    <CardActionArea
                      onClick={() => handleCardClick(card)}
                      sx={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-start",
                      }}
                    >
                      <CardMedia
                        component="img"
                        height="160"
                        image={card.image_url}
                        alt={card.alt}
                      />
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography
                          gutterBottom
                          variant="h6"
                          component="div"
                          sx={{ fontWeight: "bold" }}
                        >
                          {card.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          component="p"
                          sx={{
                            textOverflow: "ellipsis",
                            mb: 1,
                            overflow: "hidden",
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                          }}
                        >
                          {card.description}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
          </Grid>
        </Grid>
      </Box>

      {/* --- Render the Drawer Component --- */}
      <HighlightsDrawer
        item={selectedCard}
        open={isDrawerOpen}
        onClose={handleDrawerClose}
      />
    </Box>
  );
};

export default TeamAbout;
