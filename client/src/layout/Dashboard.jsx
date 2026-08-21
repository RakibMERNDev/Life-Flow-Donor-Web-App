import AddHomeIcon from "@mui/icons-material/AddHome";
import MenuIcon from "@mui/icons-material/Menu";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { FaBlogger, FaUsers } from "react-icons/fa6";
import { VscGitPullRequestGoToChanges } from "react-icons/vsc";
import { Link, Outlet } from "react-router-dom";
import useAdmin from "../hooks/useAdmin.js";
import useCurrentUser from "../hooks/useCurrentUser.js";
import { FaHistory } from "react-icons/fa";
import { IoIosCreate } from "react-icons/io";
import { BsPersonFillDown } from "react-icons/bs";
const drawerWidth = 240;

function Dashboard(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isAdmin] = useAdmin();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const { currentUser } = useCurrentUser();
  const userRole = currentUser[0]?.role;

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      {/* list of section on dashboard */}
      <List>
        <div>
          {userRole === "donor" && (
            <div>
              <Link to="/dashboard/userHome">
                <ListItem disablePadding>
                  <ListItemButton>
                    <div>
                      <ListItemIcon>
                        <AddHomeIcon />
                      </ListItemIcon>
                    </div>
                    <h1>Dashboard Home</h1>
                  </ListItemButton>
                </ListItem>
              </Link>
            </div>
          )}

          {/* for volunteer */}
          {userRole === "volunteer" && (
            <div>
              <div>
                <Link to="/dashboard/adminHome">
                  <ListItem disablePadding>
                    <ListItemButton>
                      <div>
                        <ListItemIcon>
                          <AddHomeIcon />
                        </ListItemIcon>
                      </div>
                      <h1>Dashboard Home</h1>
                    </ListItemButton>
                  </ListItem>
                </Link>
              </div>
              <div>
                <Link to="/dashboard/all-blood-donation-request">
                  <ListItem disablePadding>
                    <ListItemButton>
                      <div>
                        <ListItemIcon>
                          <VscGitPullRequestGoToChanges className="text-xl" />
                        </ListItemIcon>
                      </div>
                      <h1>All Donation Request</h1>
                    </ListItemButton>
                  </ListItem>
                </Link>
              </div>
              <Divider />

              <div>
                <Link to=" /dashboard/content-management">
                  <ListItem disablePadding>
                    <ListItemButton>
                      <div>
                        <ListItemIcon>
                          <VscGitPullRequestGoToChanges className="text-xl" />
                        </ListItemIcon>
                      </div>
                      <h1>Content Management</h1>
                    </ListItemButton>
                  </ListItem>
                </Link>
              </div>

              <Divider />
            </div>
          )}

          {isAdmin && (
            <div>
              <div>
                <Link to="/dashboard/adminHome">
                  <ListItem disablePadding>
                    <ListItemButton>
                      <div>
                        <ListItemIcon>
                          <AddHomeIcon />
                        </ListItemIcon>
                      </div>
                      <h1>Dashboard Home</h1>
                    </ListItemButton>
                  </ListItem>
                </Link>
              </div>
              <Divider />
              <div>
                <Link to="/dashboard/allusers">
                  <ListItem disablePadding>
                    <ListItemButton>
                      <div>
                        <ListItemIcon>
                          <FaUsers  className="text-xl"/>
                        </ListItemIcon>
                      </div>
                      <h1>All Users</h1>
                    </ListItemButton>
                  </ListItem>
                </Link>
              </div>
              <Divider />

              <div>
                <Link to="/dashboard/all-blood-donation-request">
                  <ListItem disablePadding>
                    <ListItemButton>
                      <div>
                        <ListItemIcon>
                          <VscGitPullRequestGoToChanges className="text-xl" />
                        </ListItemIcon>
                      </div>
                      <h1>All Donation Request</h1>
                    </ListItemButton>
                  </ListItem>
                </Link>
              </div>
              <Divider />

              <div>
                <Link to=" /dashboard/content-management">
                  <ListItem disablePadding>
                    <ListItemButton>
                      <div>
                        <ListItemIcon>
                        <FaBlogger className="text-xl" />
                        </ListItemIcon>
                      </div>
                      <h1>Content Management</h1>
                    </ListItemButton>
                  </ListItem>
                </Link>
              </div>

              <Divider />
            </div>
          )}

          <div>
            <Link to="/dashboard/profile">
              <ListItem disablePadding>
                <ListItemButton>
                  <div>
                    <ListItemIcon>
                      <PersonPinIcon />
                    </ListItemIcon>
                  </div>
                  <h1>Profile</h1>
                </ListItemButton>
              </ListItem>
            </Link>
          </div>
          <Divider />
          <div>
            <Link to="/dashboard/my-donation-requests">
              <ListItem disablePadding>
                <ListItemButton>
                  <div>
                    <ListItemIcon>
                    <BsPersonFillDown className="text-xl" />
                    </ListItemIcon>
                  </div>
                  <h1>My Requests</h1>
                </ListItemButton>
              </ListItem>
            </Link>
          </div>
          <Divider />

          <div>
            <Link to="/dashboard/create-donation-request">
              <ListItem disablePadding>
                <ListItemButton>
                  <div>
                    <ListItemIcon>
                      <IoIosCreate className="text-xl" />
                    </ListItemIcon>
                  </div>
                  <h1>Create Request</h1>
                </ListItemButton>
              </ListItem>
            </Link>
          </div>
        </div>
      </List>
      <Divider />
      <div>
        <Link to="/dashboard/paymentHistory">
          <ListItem disablePadding>
            <ListItemButton>
              <div>
                <ListItemIcon>
                  <FaHistory className="text-xl"/>
                </ListItemIcon>
              </div>
              <h1>Donation History</h1>
            </ListItemButton>
          </ListItem>
        </Link>
      </div>
      <Divider />

      <div className="text-center mt-10">
        <List>
          <Link to="/">
            {" "}
            <button className="btn text-center btn-sm ">Go Back to home</button>
          </Link>
        </List>
      </div>
    </div>
  );

  // Remove this const when copying and pasting into your project.
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex", backgroundColor: '#147C72' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar className="bg-[#8B0000]">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            <Link to="/"> LifeFlowDonor</Link>
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          background: "#147C72",
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <div className="min-h-screen">
          <Outlet></Outlet>
        </div>
      </Box>
    </Box>
  );
}

export default Dashboard;
