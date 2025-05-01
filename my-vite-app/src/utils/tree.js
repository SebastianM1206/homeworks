import Home from "../pages/Home";
import Profile from "../pages/Profile";
import Settings from "../pages/Settings";
import Password from "../pages/Password";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Team from "../pages/Team";
import History from "../pages/History";
import Support from "../pages/Support";
import Feedback from "../pages/Feedback";
import { sideBarNode } from "./node";

// This is a tree structure that represents the sidebar menu of the application.
// Each node in the tree has a title, a link, a component to render, and an array of children nodes.

const root = new sideBarNode("Sidebar Menu", "/", Home);

const homeNode = new sideBarNode("Home", "/", Home);

const settingsNode = new sideBarNode("Settings", "/settings", Settings);
const profileNode = new sideBarNode("Profile", "/settings/profile", Profile);
const passwordNode = new sideBarNode(
  "Password",
  "/settings/password",
  Password
);

// Adding new nodes
const aboutNode = new sideBarNode("About", "/about", About);
const teamNode = new sideBarNode("Team", "/about/team", Team);
const historyNode = new sideBarNode("History", "/about/history", History);

const contactNode = new sideBarNode("Contact", "/contact", Contact);
const supportNode = new sideBarNode("Support", "/contact/support", Support);
const feedbackNode = new sideBarNode("Feedback", "/contact/feedback", Feedback);

// Adding children to the settings node
settingsNode.addChild(profileNode);
settingsNode.addChild(passwordNode);

// Adding children to the about node
aboutNode.addChild(teamNode);
aboutNode.addChild(historyNode);

// Adding children to the contact node
contactNode.addChild(supportNode);
contactNode.addChild(feedbackNode);

// Adding children to the root node
root.addChild(homeNode);
root.addChild(settingsNode);
root.addChild(aboutNode);
root.addChild(contactNode);

export const sideBarTree = root;
