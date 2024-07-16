import { useReducer, useRef, useState } from "react";
import "./App.css";
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Autocomplete,
	Box,
	Button,
	Checkbox,
	FormControl,
	FormControlLabel,
	Grid,
	Icon,
	IconButton,
	Input,
	InputLabel,
	MenuItem,
	Select,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import Section from "./components/Section";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { Delete, Expand } from "@mui/icons-material";
import {
	validateDob,
	validateEmail,
	validatePassword,
	validatePhoneNumber,
} from "./helpers/Validators";

const availableSkills = [
	"Algorithms",
	"Data Structures",
	"Database Management",
	"Operating Systems",
	"Computer Networks",
	"Software Development",
	"Web Development",
	"Machine Learning",
	"Artificial Intelligence",
	"Cybersecurity",
	"Cloud Computing",
	"Mobile App Development",
	"Version Control (Git)",
	"Object-Oriented Programming",
	"Functional Programming",
	"Big Data Analysis",
	"Parallel and Distributed Computing",
	"Human-Computer Interaction",
	"DevOps",
	"Blockchain Technology",
];

function App() {
	const [certificatees, setcertificatees] = useState([
		{
			title: "",
			link: "",
		},
	]);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [dob, setDob] = useState("");
	const [skills, setSkills] = useState([]);

	const [errors, setErrors] = useState({});

	const resumeUpload = useRef();
	const [fileName, setFileName] = useState("");

	const handleFileChange = (event) => {
		if (event.target.files.length > 0) {
			setFileName(event.target.files[0]);
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const newErrors = {};

		if (!validateEmail(email)) {
			newErrors.email = "Invalid email format";
		}
		if (!validatePassword(password)) {
			newErrors.password =
				"Password must be at least 8 characters long, with at least one uppercase letter, one lowercase letter, one number, and one special character";
		}
		if (!validatePhoneNumber(phoneNumber)) {
			newErrors.phoneNumber = "Invalid phone number format";
		}
		if (!validateDob(dob)) {
			newErrors.dob = "Invalid date of birth";
		}

		if (skills.length < 1) {
			newErrors.skills = "Atleast 1 skill needed";
		}

		if (Object.keys(newErrors).length === 0) {
			alert("Form submitted successfully!");
		} else {
			console.log(newErrors);
			setErrors(newErrors);
		}
	};

	return (
		<>
			<Stack
				justifyContent={"center"}
				alignItems={"center"}
				gap={2}
				minHeight={"100vh"}
				bgcolor={"#F4F5F7"}
				py={5}
				px={1}
				component={"form"}
				onSubmit={handleSubmit}
			>
				<Heading title={"Registration"} />

				<Section title={"Personal Information"}>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								label="Full Name"
								fullWidth
								placeholder="John Doe"
								required
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								label="Email Adress"
								fullWidth
								placeholder="johndoe@gmail.com"
								required
								error={errors["email"] != null}
								onChange={(e) => {
									setEmail(e.target.value);
									setErrors({ ...errors, email: null });
								}}
								helperText={errors["email"]}
							/>
						</Grid>
						<Grid item xs={6}>
							<TextField
								label="Password"
								fullWidth
								type="password"
								required
								error={errors["password"] != null}
								onChange={(e) => {
									setPassword(e.target.value);
									setErrors({ ...errors, password: null });
								}}
								helperText={errors["password"]}
							/>
						</Grid>
						<Grid item xs={6}>
							<TextField
								label="Confirm Password"
								fullWidth
								type="password"
								required
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								label="Phone Number"
								fullWidth
								type="number"
								required
								error={errors["phoneNumber"] != null}
								onChange={(e) => {
									setPhoneNumber(e.target.value);
									setErrors({ ...errors, phoneNumber: null });
								}}
								helperText={errors["phoneNumber"]}
							/>
						</Grid>
						<Grid item xs={6}>
							<DatePicker
								format="DD/MM/YY"
								sx={{ width: "100%" }}
								onChange={(e) => setDob(e)}
								// slotProps={{
								// 	textField: {
								// 		required: true,
								// 	},
								// }}
							/>
						</Grid>
						<Grid item xs={6}>
							<FormControl fullWidth>
								<InputLabel>Gender</InputLabel>
								<Select label="Gender">
									<MenuItem value={"male"}>Male</MenuItem>
									<MenuItem value={"female"}>Female</MenuItem>
								</Select>
							</FormControl>
						</Grid>
					</Grid>
				</Section>

				<Section title={"Adress"}>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField label="Street Adress" fullWidth />
						</Grid>
						<Grid item xs={6}>
							<TextField label="City" fullWidth />
						</Grid>
						<Grid item xs={6}>
							<TextField
								label="Zip / Postal Code"
								fullWidth
								type="number"
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								label="State / Province / Region"
								fullWidth
							/>
						</Grid>

						<Grid item xs={12}>
							<TextField label="Country" fullWidth />
						</Grid>
					</Grid>
				</Section>

				<Section title={"Professional Information"}>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<Button
								variant="contained"
								onClick={() => resumeUpload.current.click()}
							>
								Upload Resume / CV
							</Button>
							<Typography display={"inline-block"} ml={2}>
								{fileName?.name}
							</Typography>
							<input
								hidden
								type="file"
								ref={resumeUpload}
								onChange={handleFileChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								label="Years of Experience"
								fullWidth
								required
								type="number"
							/>
						</Grid>

						<Grid item xs={12}>
							<Autocomplete
								multiple
								disableCloseOnSelect
								onChange={(_, v) => {
									setErrors((prev) => ({
										...prev,
										skills: null,
									}));
									setSkills(v);
								}}
								limitTags={5}
								options={availableSkills}
								getOptionLabel={(option) => option}
								renderInput={(params) => (
									<TextField
										error={errors["skills"] != null}
										helperText={errors["skills"]}
										{...params}
										label="Skills"
									/>
								)}
							/>
						</Grid>
					</Grid>
				</Section>

				<Section title={"Education"}>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField label="Degree" fullWidth />
						</Grid>
						<Grid item xs={12}>
							<TextField label="Institution" fullWidth />
						</Grid>
						<Grid item xs={12}>
							<DatePicker
								label="Year of Graduation"
								views={["year"]}
								maxDate={dayjs()}
								sx={{ width: "100%" }}
							/>
						</Grid>
						<Grid item xs={12}>
							<Box
								display={"flex"}
								justifyContent={"space-between"}
								alignItems={"center"}
							>
								<Typography>certificateions</Typography>
								<Button
									variant="contained"
									onClick={() =>
										setcertificatees((prev) => [
											...prev,
											{ title: "", link: "" },
										])
									}
								>
									Add
								</Button>
							</Box>

							<Stack gap={2} mt={1}>
								{certificatees.map((c, idx) => (
									<Box
										display={"flex"}
										alignItems={"center"}
										gap={1}
										key={idx}
									>
										<TextField
											fullWidth
											label="title"
											value={c.title}
											onChange={(e) => {
												let cirs = [...certificatees];
												cirs[idx].title =
													e.target.value;
												setcertificatees(cirs);
											}}
										/>

										<TextField
											fullWidth
											label="Link"
											value={c.link}
											onChange={(e) => {
												let cirs = [...certificatees];
												cirs[idx].link = e.target.value;
												setcertificatees(cirs);
											}}
										/>

										{certificatees.length > 1 && (
											<Box>
												<IconButton
													color="error"
													onClick={() => {
														let cirs = [
															...certificatees,
														];
														cirs.splice(idx, 1);
														setcertificatees(cirs);
													}}
												>
													<Delete />
												</IconButton>
											</Box>
										)}
									</Box>
								))}
							</Stack>
						</Grid>
					</Grid>
				</Section>

				<Section title={"Recent Work Experience"}>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField label="Company Name" fullWidth />
						</Grid>
						<Grid item xs={12}>
							<TextField label="Job Title" fullWidth required />
						</Grid>
						<Grid item xs={12}>
							<Typography>Duration</Typography>
							<Box display={"flex"} gap={1}>
								<TimePicker sx={{ width: "100%" }} />
								<TimePicker sx={{ width: "100%" }} />
							</Box>
						</Grid>

						<Grid item xs={12}>
							<TextField label="Job Description" fullWidth />
						</Grid>
						<Grid item xs={12}>
							<TextField label="Responsibilities" fullWidth />
						</Grid>
						<Grid item xs={12}>
							<TextField label="Preferences" fullWidth />
						</Grid>
						<Grid item xs={12}>
							<FormControl fullWidth>
								<InputLabel>Prefered Job Type</InputLabel>
								<Select label="Prefered Job Type">
									<MenuItem value={"ft"}>Full-Time</MenuItem>
									<MenuItem value={"pt"}>Part-Time</MenuItem>
								</Select>
							</FormControl>
						</Grid>
						<Grid item xs={12}>
							<TextField label="Prefered Industry" fullWidth />
						</Grid>
						<Grid item xs={12}>
							<TextField label="Expected Salary" fullWidth />
						</Grid>
						<Grid item xs={12}>
							<TextField
								label="Availability to Start"
								fullWidth
							/>
						</Grid>
					</Grid>
				</Section>

				<Section title={"Additional Inforation"}>
					<Box display={"flex"} alignItems={"center"}>
						<Checkbox />
						<Typography display={"inline-block"}>
							By registering, you agree to our{" "}
							<Typography
								sx={{
									fontWeight: 500,
									color: "#3e82e0",
									cursor: "pointer",
									":hover": { textDecoration: "underline" },
								}}
								component={"span"}
							>
								Terms and Conditions
							</Typography>
						</Typography>
					</Box>
				</Section>

				<Button
					variant="contained"
					sx={{ width: "min(40rem,100%)" }}
					type="submit"
				>
					Register
				</Button>
			</Stack>
		</>
	);
}

const Heading = ({ title }) => {
	return (
		<Box width={"min(40rem,100%)"}>
			<Typography component={"h1"} fontSize={"2rem"}>
				{title}
			</Typography>
		</Box>
	);
};

export default App;
