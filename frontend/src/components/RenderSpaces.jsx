import { useState } from "react";
import { Grid, Typography, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";

import SpaceItem from "./SpaceItem";

const renderMessage = (isMySpaces, isApprovalSpaces) => {
  if (isMySpaces) return (
    <>
      You haven't created any spaces! Try{" "}<Link component={RouterLink} to={"/search"}>adding a space</Link>.
    </>
  );
  if (isApprovalSpaces) return "No spaces to approve! Nothing to worry about!"
  return (
    <>
      You don't have any favorites! Let's help you{" "}<Link component={RouterLink} to={"/search"}>find a new space</Link>.
    </>
  )
};

const ApprovalDissaproval = ({ handleClick, spaceId }) => {
  const [loading, setLoading] = useState(false);
  return (
    <Grid
      item
      xs={12}
      container
      alignItems="flex-end"
      justifyContent="space-between"
    >
      <Grid item>
        <LoadingButton
          startIcon={<DoneIcon />}
          onClick={() => {
            setLoading(true);
            handleClick(true, spaceId);
          }}
          loading={loading}
          variant="outlined"
          color="secondary"
        >
          Approve
        </LoadingButton>
      </Grid>
      <Grid item>
        <LoadingButton
          startIcon={<CloseIcon />}
          onClick={() => {
            setLoading(true);
            handleClick(false, spaceId);
          }}
          loading={loading}
          variant="outlined"
          color="error"
        >
          Disapprove
        </LoadingButton>
      </Grid>
    </Grid>
  );
};

const RenderSpaces = ({
  spaces,
  photos,
  numSpaces,
  mySpaces = false,
  approvalSpaces = false,
  handleApproval = null,
}) => {
  return spaces?.length ? (
    <>
      {spaces?.slice(0, numSpaces).map((space, index) => (
        <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
          <SpaceItem
            key={index}
            space={space}
            photo={photos.find((item) => item.spaceid === space.id)}
            mySpaces={mySpaces}
            approved={space.approved}
          />
          {approvalSpaces && (
            <ApprovalDissaproval
              spaceId={space.id}
              handleClick={handleApproval}
            />
          )}
        </Grid>
      ))}
    </>
  ) : (
    <Grid item>
      <Typography variant="body1" color="initial">
        {renderMessage(mySpaces, approvalSpaces)}
      </Typography>
    </Grid>
  );
};

export default RenderSpaces;
