import { useRouter } from 'next/router';
import { useState } from 'react';
import { sanitize } from 'isomorphic-dompurify';

import { StepWrapper, FileUpload } from '@/components';
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { useInput } from '@/hooks/useInput';
import { useCreateTrackMutation } from '@/store';

const CreateTrack = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [picture, setPicture] = useState<File>();
  const [audio, setAudio] = useState<File>();
  const [name, onNameChange] = useInput('');
  const [artist, onArtistChange] = useInput('');
  const [text, onTextChange] = useInput('');

  const [createTrack, { isLoading: isCreating }] = useCreateTrackMutation();

  const router = useRouter();

  const next = () => {
    if (activeStep !== 2) {
      setActiveStep((prev) => prev + 1);
    } else {
      saveTrack();
    }
  };

  const back = () => {
    if (activeStep > 0) {
      setActiveStep((prev) => prev - 1);
    }
  };

  const saveTrack = async () => {
    if (picture && audio) {
      const formData = new FormData();
      formData.append('picture', picture);
      formData.append('audio', audio);
      formData.append('name', sanitize(name));
      formData.append('artist', sanitize(artist));
      formData.append('text', sanitize(text));

      createTrack(formData)
        .unwrap()
        .then((cratedTrack) => {
          router.push(`/tracks/${cratedTrack._id}`);
        })
        .catch((rejected) => console.error(rejected));
    }
  };

  return (
    <>
      {isCreating ? (
        <Grid
          container
          width="100%"
          height={270}
          alignItems="center"
          justifyContent="center"
          position="relative"
        >
          <CircularProgress />
        </Grid>
      ) : (
        <StepWrapper activeStep={activeStep}>
          {activeStep === 0 && (
            <Grid container direction="column" gap={2} sx={{ p: 2 }}>
              <TextField
                value={name}
                onChange={onNameChange}
                label="Track title"
              />
              <TextField
                value={artist}
                onChange={onArtistChange}
                label="Author name"
              />
              <TextField
                value={text}
                onChange={onTextChange}
                label="Lyrics"
                multiline
                rows={3}
              />
            </Grid>
          )}
          {activeStep === 1 && (
            <Grid>
              <FileUpload setFile={setPicture} accept="image/*">
                <Grid
                  container
                  width="100%"
                  height={270}
                  alignItems="center"
                  justifyContent="center"
                  position="relative"
                >
                  {picture ? (
                    <>
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 0,
                          right: 0,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '100%',
                          height: '100%',
                          backgroundColor: 'rgba(0,0,0,0.5)',
                          opacity: 0,
                          cursor: 'pointer',
                          '&:hover': {
                            opacity: 1,
                          },
                        }}
                      >
                        <Button variant="contained">
                          <Typography
                            variant="h6"
                            component="span"
                            color="white"
                          >
                            Change
                          </Typography>
                        </Button>
                      </Box>
                      <img
                        src={URL.createObjectURL(picture)}
                        width={'100%'}
                        height={270}
                        style={{
                          objectFit: 'contain',
                          objectPosition: 'center',
                        }}
                      />
                    </>
                  ) : (
                    <Button variant="contained">Upload picture</Button>
                  )}
                </Grid>
              </FileUpload>
            </Grid>
          )}
          {activeStep === 2 && (
            <Grid>
              <FileUpload setFile={setAudio} accept="audio/*">
                <Grid
                  container
                  width="100%"
                  height={270}
                  alignItems="center"
                  justifyContent="center"
                  position="relative"
                  direction="column"
                  p={2}
                >
                  {audio ? (
                    <>
                      <Typography variant="h6" component="div">
                        {audio.name}
                      </Typography>
                      <Button variant="contained" sx={{ mt: 2 }}>
                        <Typography variant="h6" component="span">
                          Change
                        </Typography>
                      </Button>
                    </>
                  ) : (
                    <Button variant="contained">Upload audio</Button>
                  )}
                </Grid>
              </FileUpload>
            </Grid>
          )}
        </StepWrapper>
      )}
      <Grid container justifyContent="space-between">
        <Button disabled={activeStep === 0} onClick={back}>
          Prev step
        </Button>
        <Button
          disabled={
            (activeStep === 1 && !picture) || (activeStep === 2 && !audio)
          }
          onClick={next}
        >
          {activeStep === 2 ? 'Save' : 'Next step'}
        </Button>
      </Grid>
    </>
  );
};

export default CreateTrack;
