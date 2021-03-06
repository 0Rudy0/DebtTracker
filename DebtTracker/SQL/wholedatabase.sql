USE [master]
GO
/****** Object:  Database [DebtTracker]    Script Date: 10.9.2015. 17:47:36 ******/
CREATE DATABASE [DebtTracker]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'DebtTracker', FILENAME = N'C:\Baze\DebtTracker.mdf' , SIZE = 5120KB , MAXSIZE = UNLIMITED, FILEGROWTH = 1024KB )
 LOG ON 
( NAME = N'DebtTracker_log', FILENAME = N'C:\Baze\DebtTracker_log.ldf' , SIZE = 1024KB , MAXSIZE = 2048GB , FILEGROWTH = 10%)
GO
ALTER DATABASE [DebtTracker] SET COMPATIBILITY_LEVEL = 120
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [DebtTracker].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [DebtTracker] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [DebtTracker] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [DebtTracker] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [DebtTracker] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [DebtTracker] SET ARITHABORT OFF 
GO
ALTER DATABASE [DebtTracker] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [DebtTracker] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [DebtTracker] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [DebtTracker] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [DebtTracker] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [DebtTracker] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [DebtTracker] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [DebtTracker] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [DebtTracker] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [DebtTracker] SET  DISABLE_BROKER 
GO
ALTER DATABASE [DebtTracker] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [DebtTracker] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [DebtTracker] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [DebtTracker] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [DebtTracker] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [DebtTracker] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [DebtTracker] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [DebtTracker] SET RECOVERY FULL 
GO
ALTER DATABASE [DebtTracker] SET  MULTI_USER 
GO
ALTER DATABASE [DebtTracker] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [DebtTracker] SET DB_CHAINING OFF 
GO
ALTER DATABASE [DebtTracker] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [DebtTracker] SET TARGET_RECOVERY_TIME = 0 SECONDS 
GO
ALTER DATABASE [DebtTracker] SET DELAYED_DURABILITY = DISABLED 
GO
EXEC sys.sp_db_vardecimal_storage_format N'DebtTracker', N'ON'
GO
USE [DebtTracker]
GO
/****** Object:  User [NT AUTHORITY\NETWORK SERVICE]    Script Date: 10.9.2015. 17:47:36 ******/
CREATE USER [NT AUTHORITY\NETWORK SERVICE] FOR LOGIN [NT AUTHORITY\NETWORK SERVICE] WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  User [mainUser]    Script Date: 10.9.2015. 17:47:36 ******/
CREATE USER [mainUser] FOR LOGIN [mainUser] WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  User [HRPRO\DRUDMAN-NB$]    Script Date: 10.9.2015. 17:47:36 ******/
CREATE USER [HRPRO\DRUDMAN-NB$] FOR LOGIN [HRPRO\DRUDMAN-NB$] WITH DEFAULT_SCHEMA=[dbo]
GO
ALTER ROLE [db_owner] ADD MEMBER [NT AUTHORITY\NETWORK SERVICE]
GO
ALTER ROLE [db_owner] ADD MEMBER [mainUser]
GO
/****** Object:  Table [dbo].[__MigrationHistory]    Script Date: 10.9.2015. 17:47:36 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[__MigrationHistory](
	[MigrationId] [nvarchar](150) NOT NULL,
	[ContextKey] [nvarchar](300) NOT NULL,
	[Model] [varbinary](max) NOT NULL,
	[ProductVersion] [nvarchar](32) NOT NULL,
 CONSTRAINT [PK_dbo.__MigrationHistory] PRIMARY KEY CLUSTERED 
(
	[MigrationId] ASC,
	[ContextKey] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[AspNetRoles]    Script Date: 10.9.2015. 17:47:36 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetRoles](
	[Id] [nvarchar](128) NOT NULL,
	[Name] [nvarchar](256) NOT NULL,
 CONSTRAINT [PK_dbo.AspNetRoles] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[AspNetUserClaims]    Script Date: 10.9.2015. 17:47:36 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetUserClaims](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[UserId] [nvarchar](128) NOT NULL,
	[ClaimType] [nvarchar](max) NULL,
	[ClaimValue] [nvarchar](max) NULL,
 CONSTRAINT [PK_dbo.AspNetUserClaims] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[AspNetUserLogins]    Script Date: 10.9.2015. 17:47:36 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetUserLogins](
	[LoginProvider] [nvarchar](128) NOT NULL,
	[ProviderKey] [nvarchar](128) NOT NULL,
	[UserId] [nvarchar](128) NOT NULL,
 CONSTRAINT [PK_dbo.AspNetUserLogins] PRIMARY KEY CLUSTERED 
(
	[LoginProvider] ASC,
	[ProviderKey] ASC,
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[AspNetUserRoles]    Script Date: 10.9.2015. 17:47:36 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetUserRoles](
	[UserId] [nvarchar](128) NOT NULL,
	[RoleId] [nvarchar](128) NOT NULL,
 CONSTRAINT [PK_dbo.AspNetUserRoles] PRIMARY KEY CLUSTERED 
(
	[UserId] ASC,
	[RoleId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[AspNetUsers]    Script Date: 10.9.2015. 17:47:36 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetUsers](
	[Id] [nvarchar](128) NOT NULL,
	[Email] [nvarchar](256) NULL,
	[EmailConfirmed] [bit] NOT NULL,
	[PasswordHash] [nvarchar](max) NULL,
	[SecurityStamp] [nvarchar](max) NULL,
	[PhoneNumber] [nvarchar](max) NULL,
	[PhoneNumberConfirmed] [bit] NOT NULL,
	[TwoFactorEnabled] [bit] NOT NULL,
	[LockoutEndDateUtc] [datetime] NULL,
	[LockoutEnabled] [bit] NOT NULL,
	[AccessFailedCount] [int] NOT NULL,
	[UserName] [nvarchar](256) NOT NULL,
 CONSTRAINT [PK_dbo.AspNetUsers] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Debt]    Script Date: 10.9.2015. 17:47:36 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Debt](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Description] [nchar](100) NOT NULL,
	[Ammount] [float] NOT NULL,
	[Date] [date] NOT NULL,
	[TypeId] [int] NOT NULL,
	[DoesRepeat] [bit] NOT NULL,
	[RepeatCount] [int] NULL,
	[UserOwner] [nvarchar](128) NOT NULL,
	[ForUser] [nvarchar](128) NOT NULL,
 CONSTRAINT [PK_Debt] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[DebtTemplate]    Script Date: 10.9.2015. 17:47:36 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DebtTemplate](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Description] [nchar](100) NOT NULL,
	[DebtType] [int] NOT NULL,
	[Ammount] [float] NOT NULL,
 CONSTRAINT [PK_DebtTemplate] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[DebtType]    Script Date: 10.9.2015. 17:47:36 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DebtType](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Description] [nchar](200) NOT NULL,
 CONSTRAINT [PK_DebtType] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[PaidDebts]    Script Date: 10.9.2015. 17:47:36 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PaidDebts](
	[DebtId] [int] NOT NULL,
	[PayDate] [date] NOT NULL
) ON [PRIMARY]

GO
INSERT [dbo].[__MigrationHistory] ([MigrationId], [ContextKey], [Model], [ProductVersion]) VALUES (N'201509021346434_InitialCreate', N'DebtTracker.Models.ApplicationDbContext', 0x1F8B0800000000000400DD5CDB6EDC36107D2FD07F10F4D416CECA9726488DDD04CEDA6E8DC617649DA06F0157E2AE8548942A518E8DA25FD6877E527FA14389BAF1A2CBAEBCBB0E020416393C331C0EC9E170B8FFFDF3EFF8ED83EF19F7388ADD804CCC83D1BE696062078E4B961333A18B17AFCDB76FBEFF6E7CE6F80FC6A79CEE88D1414B124FCC3B4AC363CB8AED3BECA378E4BB7614C4C1828EECC0B790135887FBFBBF58070716060813B00C63FC2121D4F571FA019FD380D838A409F22E03077B312F879A598A6A5C211FC721B2F1C43CC5737A1B21FB0B8E4619B5699C782E024966D85B98062224A088829CC71F633CA3514096B3100A9077FB1862A05B202FC65CFEE392BC6B57F60F5957ACB2610E6527310DFC9E8007475C3796D87C250D9B85EE407B67A065FAC87A9D6A70625E38382DFA1078A00091E1F1D48B18F1C4BC2C589CC4E115A6A3BCE128833C8F00EE6B107D195511F78CCEEDF60A5B3A1CEDB37F7BC634F16812E109C1098D90B767DC2473CFB57FC78FB7C1174C264707F3C5D1EB97AF9073F4EA677CF4B2DA53E82BD0D50AA0E8260A421C816C7851F4DF34AC7A3B4B6C5834ABB4C9B402B604D3C2342ED1C37B4C96F40E26CCE16BD338771FB0939770E3FA485C9845D08846097C5E259E87E61E2EEAAD469EECFF06AE872F5F0DC2F50ADDBBCB74E805FE30712298571FB097D6C6776E984DAFDA787FE664E751E0B3EFBA7D65B59F674112D9AC338196E416454B4CEBD28DADD2783B9934831ADEAC73D4DD376D26A96CDE4A52D6A1556642CE62D3B32197F769F976B6B8933084C14B4D8B69A4C9E0E4CD6A24B4DE332A34A5E91C74351D025DFA9657C2331FB9DE004B61072EE0852CDCC8C7452FDF05607888F496F906C531AC04CE6F28BE6B101DFE1C40F419B693080C7446911F3E39B79BBB80E0ABC49F33BBDF1CAFC186E6F66B708E6C1A446784B55A1BEF7D607F09127A469C5344F1476AE780ECF3D6F5BB030C22CE896DE3383E0763C6CE3400273B07BC20F4E8B0371C5BA0B6ED8A4C3DE4FA6A5F44584A3FE7A4A53FA2A6907C120D99CA2F6912F57DB0744937517352BDA81945ABA89CACAFA80CAC9BA49C522F684AD02A67463598A7978ED0F0AE5E0ABBFBBEDE7A9BB76E2DA8A871062B24FE15131CC132E6DC204A7144CA11E8B26E6CC35948878F317DF2BD29E5F40979C9D0AC569A0DE92230FC6C4861777F36A46242F1BDEB30AFA4C301282706F84EF4EAB355FB9C1324DBF474A87573D3CC37B306E8A6CB491C07B69BCE0245E88B072EEAF2830F67B44731B2DE889110E81818BACBB63C2881BE99A2515D9353EC618A8D133B0B0D4E516C2347562374C8E92158BEA32A042B232275E17E927882A5E3883542EC1014C34C750995A7854B6C37445EAB9684961DB730D6F7828758738A434C18C3564D7461AE0E8030010A3EC2A0B469686C552CAED910355EAB6ECCDB5CD872DCA5B8C4466CB2C577D6D825F7DF9EC4309B35B601E36C56491701B4C1BC6D18283FAB743500F1E0B26B062A9C983406CA5DAA8D18685D635B30D0BA4A9E9D816647D4AEE32F9C5777CD3CEB07E5CD6FEB8DEADA826DD6F4B163A699F99ED086420B1CC9E6793A6795F8812A0E6720273F9FC5DCD5154D8481CF30AD876C4A7F57E9875ACD20A21135019686D602CAAF0125206942F5102E8FE5354AC7BD881EB079DCAD1196AFFD026CC50664ECEA756885507F692A1A67A7D347D1B3C21A2423EF7458A8E0280C425CBCEA1DEFA0145D5C56564C175FB88F375CE9181F8C0605B578AE1A25E59D195C4BB969B66B49E590F571C9D6D292E03E69B4947766702D711B6D5792C229E8E116ACA5A2FA163ED064CB231DC56E53D48DAD2C4B8A178C2D4D3AD5F81285A14B9695F42A5E62CCB2DCAAE98B59FFA4233FC3B0EC58917B54485B70A241849658A805D620E9B91BC5F4145134472CCE33757C894CB9B76A96FF9C6575FB940731DF07726AF677D64271795FDB6B656784639C430F7DE6D1A46174C5F8AB9B1B2CDD0D79285244EEA78197F844EF60E95B67F777D5F659898C30B604F925074AD296E4E6D655DF6960E44931D02015FECBEA03A587D0A93BF73EAB0AD779A47A943C405545D105ADB636703A47A6D760893E62FFB16A45789A79C51353AA00BCA8274625B74102ABD47547ADA79F5431EB35DD11851C932AA450D543CA6A26494DC86AC54A781A8DAA29BA73907347AAE8726D7764451649155A51BD02B64266B1AE3BAA22D1A40AACA8EE8E5D669D888BE80EEF5CDA93CBCA5B5776B85D6FEFD2603CCD8A38CCD657B9C3AF02558A7B62F15B7A098C97EFA435694F782B5B5316D358CF9A3418FA95A776FB5D5F781AAFECF598B52BEDDAE2DE74A5AFC7EB67B34F6A19D2014F2429B817073DE14037E687ABF64734D2692B23318D5C8DB0B13FC614FB2346309AFDE94D3D17B3653C27B844C45DE09866691CE6E1FEC1A1F00E6777DEC45871EC788AC3A9EE614C7DCC36909145EE5164DFA148CE8F58E3DD48092A859E2F88831F26E65F69ABE3348AC1FE4A8BF78C8BF82371FF4CA0E2364AB0F1B79CEF394C1E7DF3216B475F3D74D7EAC51F9FB3A67BC6750433E6D8D81774B9CA08D7DF42F492266BBA86342BBF9078BE13AAF6FC40892A4C88D55F1BCC5D3AC84B835CCA1F7CF4F0635FD194AF09D64254BC18180A6F1015EA5E04AC82A57D0DE0C0274D5F03F4EBACFA75C02AA2695F06B8A43F98F82EA0FB3294B7DCE256A338136D62494AF5DC9A57BD5692E5B6F72629FD7AAD892EA758F7805B238D7A05CB786619C883ED8E8A04E3C1B0B769DA4F9E55BC2B89C4658AC776F387379932DC702DF44D650AEF406E9B225767FBF9C09BB6355D1C77C7932AFB65FDEE98B1F10CAEEDE7F66EDAD87461DE1D37B65E19BC3B666BDBDA3FB76C699DB7D0ADE7E3CAA9459AFB18552CB82DDF360B9CC3097F1E8011641E65F64C529DE0D5949CDAC2B024D133D56796898CA58923F195289AD9F6EB2BDFF01B3BCB699AD96AF2319B78F3F5BF9137A769E6ADC972DC46A6B032CF5095BDDDB28E3525413DA7CCE05A4F5A12D1DB7CD6C6CBF5E794083C88526AB3477347FC7CF27E0751C99053A7479EAF7CDD0B7B67E5971561FF8EDD6509C17E679160BBB66B1634176411E49BB720514E2244682E31450E6CA927117517C8A650CD62CCE93BEF346EC76E3AE6D8B920D7090D130A5DC6FEDCAB05BC9813D0C43F4D66AECB3CBE0ED39F2C19A20B20A6CB62F3D7E45DE27A4E21F7B92226A48160DE058FE8B2B1A42CB2BB7C2C90AE02D21188ABAF708A6EB11F7A00165F9319BAC7ABC806E6F71E2F91FD5846007520ED035157FBF8D445CB08F931C728DBC327D8B0E33FBCF91F8A9225C860540000, N'6.1.3-40302')
INSERT [dbo].[AspNetRoles] ([Id], [Name]) VALUES (N'1', N'Može sve')
INSERT [dbo].[AspNetRoles] ([Id], [Name]) VALUES (N'3', N'Smije gledati')
INSERT [dbo].[AspNetRoles] ([Id], [Name]) VALUES (N'2', N'Smije unositi i editirati svoje')
INSERT [dbo].[AspNetUsers] ([Id], [Email], [EmailConfirmed], [PasswordHash], [SecurityStamp], [PhoneNumber], [PhoneNumberConfirmed], [TwoFactorEnabled], [LockoutEndDateUtc], [LockoutEnabled], [AccessFailedCount], [UserName]) VALUES (N'1c66ccc4-cc7a-4fb7-80b6-99be0a7edbab', N'mama@test.hr', 0, N'AK4lgSoJikeDljE5IXMV2fQemSib6syOzGTj8k0lNdv3vG8w3Gge+A0Tcd7m9cWyaA==', N'53d12df0-99d2-40f0-b409-e8c5285d2bdd', NULL, 0, 0, NULL, 1, 0, N'Mama')
INSERT [dbo].[AspNetUsers] ([Id], [Email], [EmailConfirmed], [PasswordHash], [SecurityStamp], [PhoneNumber], [PhoneNumberConfirmed], [TwoFactorEnabled], [LockoutEndDateUtc], [LockoutEnabled], [AccessFailedCount], [UserName]) VALUES (N'487eadf8-633a-4c01-a3e7-2f5ea2d12311', N'tata@test.hr', 0, N'AJ0cKs9WhQ6W9pqLOBu4Ff8wtFYyZBWEodREa38ZbEhbsvhG7x/3pZTvErkLU9hfYQ==', N'4335136e-6751-4036-9b90-647dbb4467ae', NULL, 0, 0, NULL, 1, 0, N'Tata')
INSERT [dbo].[AspNetUsers] ([Id], [Email], [EmailConfirmed], [PasswordHash], [SecurityStamp], [PhoneNumber], [PhoneNumberConfirmed], [TwoFactorEnabled], [LockoutEndDateUtc], [LockoutEnabled], [AccessFailedCount], [UserName]) VALUES (N'63fbcc05-04b9-4b93-83ec-6b698dd4cddf', N'mario@test.hr', 0, N'AFWSRnJlney40d/aiwvY/JZ5CxHl1pz7xrMd/GwU5t+Fpagj3Oy3NJLcSBdAYEOU3A==', N'045c2f0d-a38f-49b6-9e3f-39509024309f', NULL, 0, 0, NULL, 1, 0, N'Mario')
INSERT [dbo].[AspNetUsers] ([Id], [Email], [EmailConfirmed], [PasswordHash], [SecurityStamp], [PhoneNumber], [PhoneNumberConfirmed], [TwoFactorEnabled], [LockoutEndDateUtc], [LockoutEnabled], [AccessFailedCount], [UserName]) VALUES (N'728c7cae-7979-4ec4-a948-57440e13b923', N'danijel@test.hr', 0, N'AKLWWHTACZwjX9t2k9AfRfaTb17JXfxsl4D+HKRS72nCsuNOjJBcps/nrIbvm4SSyw==', N'5b95a859-f1bf-4f7e-b9b4-f5b908138a42', NULL, 0, 0, NULL, 1, 0, N'Danijel')
SET IDENTITY_INSERT [dbo].[Debt] ON 

INSERT [dbo].[Debt] ([Id], [Description], [Ammount], [Date], [TypeId], [DoesRepeat], [RepeatCount], [UserOwner], [ForUser]) VALUES (1, N'Jaja                                                                                                ', 60, CAST(N'2015-08-01' AS Date), 2, 0, NULL, N'1c66ccc4-cc7a-4fb7-80b6-99be0a7edbab', N'728c7cae-7979-4ec4-a948-57440e13b923')
INSERT [dbo].[Debt] ([Id], [Description], [Ammount], [Date], [TypeId], [DoesRepeat], [RepeatCount], [UserOwner], [ForUser]) VALUES (3, N'Posni                                                                                               ', 105, CAST(N'2015-08-10' AS Date), 2, 0, NULL, N'487eadf8-633a-4c01-a3e7-2f5ea2d12311', N'728c7cae-7979-4ec4-a948-57440e13b923')
INSERT [dbo].[Debt] ([Id], [Description], [Ammount], [Date], [TypeId], [DoesRepeat], [RepeatCount], [UserOwner], [ForUser]) VALUES (4, N'Jaja                                                                                                ', 60, CAST(N'2015-08-15' AS Date), 2, 0, NULL, N'1c66ccc4-cc7a-4fb7-80b6-99be0a7edbab', N'728c7cae-7979-4ec4-a948-57440e13b923')
INSERT [dbo].[Debt] ([Id], [Description], [Ammount], [Date], [TypeId], [DoesRepeat], [RepeatCount], [UserOwner], [ForUser]) VALUES (5, N'Jaja                                                                                                ', 60, CAST(N'2015-09-01' AS Date), 2, 0, NULL, N'1c66ccc4-cc7a-4fb7-80b6-99be0a7edbab', N'728c7cae-7979-4ec4-a948-57440e13b923')
INSERT [dbo].[Debt] ([Id], [Description], [Ammount], [Date], [TypeId], [DoesRepeat], [RepeatCount], [UserOwner], [ForUser]) VALUES (8, N'Struja                                                                                              ', 46, CAST(N'2015-08-01' AS Date), 1, 1, NULL, N'487eadf8-633a-4c01-a3e7-2f5ea2d12311', N'728c7cae-7979-4ec4-a948-57440e13b923')
INSERT [dbo].[Debt] ([Id], [Description], [Ammount], [Date], [TypeId], [DoesRepeat], [RepeatCount], [UserOwner], [ForUser]) VALUES (9, N'Testna rata                                                                                         ', 100, CAST(N'2015-07-15' AS Date), 3, 1, 4, N'487eadf8-633a-4c01-a3e7-2f5ea2d12311', N'728c7cae-7979-4ec4-a948-57440e13b923')
INSERT [dbo].[Debt] ([Id], [Description], [Ammount], [Date], [TypeId], [DoesRepeat], [RepeatCount], [UserOwner], [ForUser]) VALUES (10, N'Sladoledi                                                                                           ', -50, CAST(N'2015-08-20' AS Date), 4, 0, NULL, N'728c7cae-7979-4ec4-a948-57440e13b923', N'728c7cae-7979-4ec4-a948-57440e13b923')
SET IDENTITY_INSERT [dbo].[Debt] OFF
SET IDENTITY_INSERT [dbo].[DebtTemplate] ON 

INSERT [dbo].[DebtTemplate] ([Id], [Description], [DebtType], [Ammount]) VALUES (1, N'Jaja                                                                                                ', 2, 60)
INSERT [dbo].[DebtTemplate] ([Id], [Description], [DebtType], [Ammount]) VALUES (2, N'Posni                                                                                               ', 2, 105)
INSERT [dbo].[DebtTemplate] ([Id], [Description], [DebtType], [Ammount]) VALUES (3, N'Plac                                                                                                ', 2, 150)
INSERT [dbo].[DebtTemplate] ([Id], [Description], [DebtType], [Ammount]) VALUES (4, N'Struja                                                                                              ', 1, 46)
INSERT [dbo].[DebtTemplate] ([Id], [Description], [DebtType], [Ammount]) VALUES (5, N'Voda                                                                                                ', 1, 100)
SET IDENTITY_INSERT [dbo].[DebtTemplate] OFF
SET IDENTITY_INSERT [dbo].[DebtType] ON 

INSERT [dbo].[DebtType] ([Id], [Description]) VALUES (1, N'Režija                                                                                                                                                                                                  ')
INSERT [dbo].[DebtType] ([Id], [Description]) VALUES (2, N'Hrana                                                                                                                                                                                                   ')
INSERT [dbo].[DebtType] ([Id], [Description]) VALUES (3, N'Ostalo                                                                                                                                                                                                  ')
INSERT [dbo].[DebtType] ([Id], [Description]) VALUES (4, N'Mini otplata                                                                                                                                                                                            ')
SET IDENTITY_INSERT [dbo].[DebtType] OFF
INSERT [dbo].[PaidDebts] ([DebtId], [PayDate]) VALUES (1, CAST(N'2015-08-15' AS Date))
INSERT [dbo].[PaidDebts] ([DebtId], [PayDate]) VALUES (3, CAST(N'2015-08-15' AS Date))
INSERT [dbo].[PaidDebts] ([DebtId], [PayDate]) VALUES (4, CAST(N'2015-08-15' AS Date))
INSERT [dbo].[PaidDebts] ([DebtId], [PayDate]) VALUES (9, CAST(N'2015-08-15' AS Date))
INSERT [dbo].[PaidDebts] ([DebtId], [PayDate]) VALUES (5, CAST(N'2015-09-10' AS Date))
INSERT [dbo].[PaidDebts] ([DebtId], [PayDate]) VALUES (8, CAST(N'2015-09-10' AS Date))
INSERT [dbo].[PaidDebts] ([DebtId], [PayDate]) VALUES (9, CAST(N'2015-09-10' AS Date))
INSERT [dbo].[PaidDebts] ([DebtId], [PayDate]) VALUES (10, CAST(N'2015-09-10' AS Date))
SET ANSI_PADDING ON

GO
/****** Object:  Index [RoleNameIndex]    Script Date: 10.9.2015. 17:47:36 ******/
CREATE UNIQUE NONCLUSTERED INDEX [RoleNameIndex] ON [dbo].[AspNetRoles]
(
	[Name] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
SET ANSI_PADDING ON

GO
/****** Object:  Index [IX_UserId]    Script Date: 10.9.2015. 17:47:36 ******/
CREATE NONCLUSTERED INDEX [IX_UserId] ON [dbo].[AspNetUserClaims]
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
SET ANSI_PADDING ON

GO
/****** Object:  Index [IX_UserId]    Script Date: 10.9.2015. 17:47:36 ******/
CREATE NONCLUSTERED INDEX [IX_UserId] ON [dbo].[AspNetUserLogins]
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
SET ANSI_PADDING ON

GO
/****** Object:  Index [IX_RoleId]    Script Date: 10.9.2015. 17:47:36 ******/
CREATE NONCLUSTERED INDEX [IX_RoleId] ON [dbo].[AspNetUserRoles]
(
	[RoleId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
SET ANSI_PADDING ON

GO
/****** Object:  Index [IX_UserId]    Script Date: 10.9.2015. 17:47:36 ******/
CREATE NONCLUSTERED INDEX [IX_UserId] ON [dbo].[AspNetUserRoles]
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
SET ANSI_PADDING ON

GO
/****** Object:  Index [UserNameIndex]    Script Date: 10.9.2015. 17:47:36 ******/
CREATE UNIQUE NONCLUSTERED INDEX [UserNameIndex] ON [dbo].[AspNetUsers]
(
	[UserName] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
ALTER TABLE [dbo].[AspNetUserClaims]  WITH CHECK ADD  CONSTRAINT [FK_dbo.AspNetUserClaims_dbo.AspNetUsers_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[AspNetUsers] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AspNetUserClaims] CHECK CONSTRAINT [FK_dbo.AspNetUserClaims_dbo.AspNetUsers_UserId]
GO
ALTER TABLE [dbo].[AspNetUserLogins]  WITH CHECK ADD  CONSTRAINT [FK_dbo.AspNetUserLogins_dbo.AspNetUsers_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[AspNetUsers] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AspNetUserLogins] CHECK CONSTRAINT [FK_dbo.AspNetUserLogins_dbo.AspNetUsers_UserId]
GO
ALTER TABLE [dbo].[AspNetUserRoles]  WITH CHECK ADD  CONSTRAINT [FK_dbo.AspNetUserRoles_dbo.AspNetRoles_RoleId] FOREIGN KEY([RoleId])
REFERENCES [dbo].[AspNetRoles] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AspNetUserRoles] CHECK CONSTRAINT [FK_dbo.AspNetUserRoles_dbo.AspNetRoles_RoleId]
GO
ALTER TABLE [dbo].[AspNetUserRoles]  WITH CHECK ADD  CONSTRAINT [FK_dbo.AspNetUserRoles_dbo.AspNetUsers_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[AspNetUsers] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AspNetUserRoles] CHECK CONSTRAINT [FK_dbo.AspNetUserRoles_dbo.AspNetUsers_UserId]
GO
ALTER TABLE [dbo].[DebtTemplate]  WITH CHECK ADD  CONSTRAINT [FK_DebtTemplate_DebtType] FOREIGN KEY([DebtType])
REFERENCES [dbo].[DebtType] ([Id])
GO
ALTER TABLE [dbo].[DebtTemplate] CHECK CONSTRAINT [FK_DebtTemplate_DebtType]
GO
ALTER TABLE [dbo].[PaidDebts]  WITH CHECK ADD  CONSTRAINT [FK_PaidDebts_Debt] FOREIGN KEY([DebtId])
REFERENCES [dbo].[Debt] ([Id])
GO
ALTER TABLE [dbo].[PaidDebts] CHECK CONSTRAINT [FK_PaidDebts_Debt]
GO
/****** Object:  StoredProcedure [dbo].[getDebtTypes]    Script Date: 10.9.2015. 17:47:36 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[getDebtTypes] as
begin
select * from DebtType
end
GO
/****** Object:  StoredProcedure [dbo].[getPaidDebts]    Script Date: 10.9.2015. 17:47:36 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[getPaidDebts] (
	@DateFrom DATETIME,
	@DateTo DATETIME,
	@ForUser VARCHAR(128)
	) as
begin
	select * from PaidDebts p
		join Debt d on p.DebtId = d.Id 
		where p.PayDate >= @DateFrom 
		and p.paydate < @DateTo
		and d.ForUser = @ForUser
	end
GO
/****** Object:  StoredProcedure [dbo].[getTemplates]    Script Date: 10.9.2015. 17:47:36 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[getTemplates] (
	@Owner VARCHAR(128)
) AS
BEGIN
	select * from DebtTemplate
END
GO
/****** Object:  StoredProcedure [dbo].[getUnpaidDebts]    Script Date: 10.9.2015. 17:47:36 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[getUnpaidDebts] (
	@ForUser VARCHAR(128)
	) as
begin
	select * from Debt d 
		where d.Id not in 
			(select DebtId from PaidDebts)
		or 
			(select count(*) from PaidDebts where DebtId = d.Id) 
				< d.repeatCount
	end
GO
/****** Object:  StoredProcedure [dbo].[payUnpaid]    Script Date: 10.9.2015. 17:47:36 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[payUnpaid] (
	@Owner VARCHAR(128)
) AS
BEGIN
	CREATE TABLE #unpaidDebts
	(
	   Id INT,
	   Description VARCHAR(100),
	   Ammount INT,
	   Date DATE,
	   TypeiD INT,
	   DoesRepeat BIT,
	   RepeatCount int,
	   UserOwner VARCHAR(128),
	   ForUser VARCHAR(128)
	)

	INSERT INTO #unpaidDebts
	Exec getUnpaidDebts @ForUser = @Owner

	--select * from #unpaidDebts

	declare @DebtId int

	while exists (select * from #unpaidDebts)
	begin

		select @DebtId = (select top 1 Id
							from #unpaidDebts
							order by Id asc)

		INSERT INTO PaidDebts VALUES(@DebtId, GETDATE())

		delete #unpaidDebts
		where Id = @DebtId

	end
END
GO
USE [master]
GO
ALTER DATABASE [DebtTracker] SET  READ_WRITE 
GO
